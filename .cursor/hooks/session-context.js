const payload = {
  additional_context:
    "VitaForge agent setup: follow AGENTS.md and .cursor/rules. Use project skills in .cursor/skills, subagents in .cursor/agents, and MCP server vitaforge-docs for docs/wiki. Delete temp*.txt and *.tmp when a task finishes. Do not commit real .env files.",
};

process.stdout.write(JSON.stringify(payload));
