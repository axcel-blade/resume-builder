import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { CollabService } from './collab.service';
import { JoinCollabDto, PublishCollabDto } from './dto/collab.dto';

/** REST + SSE surface for shared resume rooms (`/api/collab/...`). */
@Controller('collab')
export class CollabController {
  constructor(private readonly collabService: CollabService) {}

  @Post('rooms')
  @HttpCode(HttpStatus.CREATED)
  createRoom() {
    return this.collabService.createRoom();
  }

  @Get('rooms/:roomId')
  @HttpCode(HttpStatus.OK)
  getRoom(@Param('roomId') roomId: string) {
    const room = this.collabService.getRoom(roomId);
    return {
      roomId: room.id,
      revision: room.revision,
      resume: room.resume,
      peers: room.peers.size,
    };
  }

  @Post('rooms/:roomId/join')
  @HttpCode(HttpStatus.OK)
  join(@Param('roomId') roomId: string, @Body() body: JoinCollabDto) {
    return this.collabService.join(roomId, body.clientId);
  }

  @Post('rooms/:roomId/state')
  @HttpCode(HttpStatus.OK)
  publish(@Param('roomId') roomId: string, @Body() body: PublishCollabDto) {
    return this.collabService.publish(roomId, body.clientId, body.resume);
  }

  /** Long-lived SSE stream; closes when the client disconnects. */
  @Get('rooms/:roomId/stream')
  stream(
    @Param('roomId') roomId: string,
    @Query('clientId') clientId: string,
    @Req() req: { on: (event: string, handler: () => void) => void },
    @Res() res: { setHeader: (name: string, value: string) => void; write: (chunk: string) => void; flushHeaders?: () => void },
    @Headers('authorization') _authorization?: string,
  ) {
    this.collabService.getRoom(roomId);
    if (clientId) {
      this.collabService.join(roomId, clientId);
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const unsubscribe = this.collabService.subscribe(roomId, (event) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    req.on('close', () => {
      unsubscribe();
      if (clientId) {
        this.collabService.leave(roomId, clientId);
      }
    });
  }
}
