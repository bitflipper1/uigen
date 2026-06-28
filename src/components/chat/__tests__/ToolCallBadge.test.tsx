import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallBadge } from "../ToolCallBadge";

afterEach(() => {
  cleanup();
});

// ── str_replace_editor labels ─────────────────────────────────────────────────

test("shows 'Creating /path' for str_replace_editor create command", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.jsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Creating /App.jsx")).toBeDefined();
});

test("shows 'Editing /path' for str_replace_editor str_replace command", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "str_replace", path: "/Button.tsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Editing /Button.tsx")).toBeDefined();
});

test("shows 'Editing /path' for str_replace_editor insert command", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "insert", path: "/Button.tsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Editing /Button.tsx")).toBeDefined();
});

test("shows 'Reading /path' for str_replace_editor view command", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "view", path: "/App.jsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Reading /App.jsx")).toBeDefined();
});

test("shows 'Reverting /path' for str_replace_editor undo_edit command", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "undo_edit", path: "/App.jsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Reverting /App.jsx")).toBeDefined();
});

// ── file_manager labels ───────────────────────────────────────────────────────

test("shows 'Renaming /path' for file_manager rename command", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "file_manager",
        args: { command: "rename", path: "/old.jsx", new_path: "/new.jsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Renaming /old.jsx")).toBeDefined();
});

test("shows 'Deleting /path' for file_manager delete command", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "file_manager",
        args: { command: "delete", path: "/App.jsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Deleting /App.jsx")).toBeDefined();
});

// ── Fallbacks ─────────────────────────────────────────────────────────────────

test("falls back to tool name for unknown tools", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "some_unknown_tool",
        args: {},
        state: "call",
      }}
    />
  );
  expect(screen.getByText("some_unknown_tool")).toBeDefined();
});

test("shows fallback text when path is missing for create", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "create" },
        state: "partial-call",
      }}
    />
  );
  expect(screen.getByText("Creating file")).toBeDefined();
});

test("shows fallback text when path is missing for delete", () => {
  render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "file_manager",
        args: { command: "delete" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Deleting file")).toBeDefined();
});

// ── State: in-progress ────────────────────────────────────────────────────────

test("shows spinner and no green dot when state is 'call'", () => {
  const { container } = render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.jsx" },
        state: "call",
      }}
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("shows spinner when state is 'partial-call'", () => {
  const { container } = render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.jsx" },
        state: "partial-call",
      }}
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

// ── State: done ───────────────────────────────────────────────────────────────

test("shows green dot and no spinner when state is 'result'", () => {
  const { container } = render(
    <ToolCallBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.jsx" },
        state: "result",
        result: "File created: /App.jsx",
      }}
    />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});
