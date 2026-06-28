"use client";

import { Loader2 } from "lucide-react";
import type { ToolInvocation } from "ai";

interface ToolCallBadgeProps {
  toolInvocation: ToolInvocation;
}

function getToolLabel(toolName: string, args: Record<string, unknown>): string {
  const path = args.path as string | undefined;

  if (toolName === "str_replace_editor") {
    switch (args.command) {
      case "create":
        return path ? `Creating ${path}` : "Creating file";
      case "str_replace":
      case "insert":
        return path ? `Editing ${path}` : "Editing file";
      case "view":
        return path ? `Reading ${path}` : "Reading file";
      case "undo_edit":
        return path ? `Reverting ${path}` : "Reverting file";
    }
  }

  if (toolName === "file_manager") {
    switch (args.command) {
      case "rename":
        return path ? `Renaming ${path}` : "Renaming file";
      case "delete":
        return path ? `Deleting ${path}` : "Deleting file";
    }
  }

  return toolName;
}

export function ToolCallBadge({ toolInvocation }: ToolCallBadgeProps) {
  const { toolName, args, state } = toolInvocation;
  const isDone = state === "result";
  const label = getToolLabel(toolName, args as Record<string, unknown>);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
