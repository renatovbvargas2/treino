---
name: openspec-apply-change
description: Implement tasks from an OpenSpec change. Use when the user wants to start implementing, continue implementation, or work through tasks.
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "1.1"
  generatedBy: "1.3.1"
---

Implement tasks from an OpenSpec change.

**Input**: Optionally specify a change name. If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

   Always announce: "Using change: <name>" and how to override (e.g., `/opsx:apply <other>`).

2. **Check status to understand the schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   Parse the JSON to understand:
   - `schemaName`: The workflow being used (e.g., "spec-driven")
   - Which artifact contains the tasks (typically "tasks" for spec-driven, check status for others)

3. **Get apply instructions**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   This returns:
   - `contextFiles`: artifact ID -> array of concrete file paths (varies by schema - could be proposal/specs/design/tasks or spec/tests/implementation/docs)
   - Progress (total, complete, remaining)
   - Task list with status
   - Dynamic instruction based on current state

   **Handle states:**
   - If `state: "blocked"` (missing artifacts): show message, suggest using openspec-continue-change
   - If `state: "all_done"`: congratulate, suggest archive
   - Otherwise: proceed to steps 4–8

4. **Read context files**

   Read every file path listed under `contextFiles` from the apply instructions output.
   The files depend on the schema being used:
   - **spec-driven**: proposal, specs, design, tasks
   - Other schemas: follow the contextFiles from CLI output

5. **Show current progress**

   Display:
   - Schema being used
   - Progress: "N/M tasks complete"
   - Remaining tasks overview
   - Dynamic instruction from CLI

6. **Prepare branch and open PR from `main`** (required before any implementation)

   Skip this step only when apply state is `blocked` or `all_done`.

   **Goal**: Every implementation session works on a feature branch with an open PR targeting `main`.

   a. **Branch name**: use the change name (e.g., `fix-workout-ui-issue-5`).

   b. **Reuse existing PR** (resume / continue sessions):
   ```bash
   gh pr list --head "<branch-name>" --base main --json number,url,state
   ```
   If an open PR exists, announce branch and PR URL, then go to step 7.

   c. **Sync and branch from `main`**:
   ```bash
   git fetch origin main
   ```
   - If already on `<branch-name>` and it tracks `origin/<branch-name>`, continue to (d).
   - Otherwise:
     - Stash uncommitted work if needed: `git stash push -u -m "openspec-apply: <name>"`
     - Update main: `git checkout main` then `git pull origin main`
     - Create branch: `git checkout -b "<branch-name>"`
     - Restore stash if created: `git stash pop` (resolve conflicts before continuing)

   d. **Initial commit** (when the branch has no commits ahead of `main`):
   - Commit OpenSpec artifacts under `openspec/changes/<name>/` if present and uncommitted.
   - Message example: `chore(openspec): start change <name>`
   - Do not commit files that likely contain secrets (`.env`, credentials, etc.).

   e. **Push and open PR**:
   ```bash
   git push -u origin HEAD
   gh pr create --base main --head "<branch-name>" --title "<short title from proposal/tasks>" --body "$(cat <<'EOF'
   ## Summary
   OpenSpec change: `<name>`
   - <bullet from proposal or tasks context>
   - <bullet 2 if useful>

   ## Test plan
   - [ ] Complete tasks in `openspec/changes/<name>/tasks.md`

   EOF
   )"
   ```

   f. **Announce** branch name and PR URL. **Do not start step 7 until the PR exists.**

   **On failure** (missing `gh`, auth error, push rejected): pause, report the error, and wait for guidance. Do not implement without an open PR.

7. **Implement tasks (loop until done or blocked)**

   For each pending task:
   - Show which task is being worked on
   - Make the code changes required
   - Keep changes minimal and focused
   - Mark task complete in the tasks file: `- [ ]` → `- [x]`
   - Continue to next task

   **Pause if:**
   - Task is unclear → ask for clarification
   - Implementation reveals a design issue → suggest updating artifacts
   - Error or blocker encountered → report and wait for guidance
   - User interrupts

8. **On completion or pause, show status**

   Display:
   - Tasks completed this session
   - Overall progress: "N/M tasks complete"
   - If all done: suggest archive
   - If paused: explain why and wait for guidance

**Output During Implementation**

```
## Implementing: <change-name> (schema: <schema-name>)
**Branch:** <branch-name> · **PR:** <pr-url>

Working on task 3/7: <task description>
[...implementation happening...]
✓ Task complete

Working on task 4/7: <task description>
[...implementation happening...]
✓ Task complete
```

**Output On Completion**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Completed This Session
- [x] Task 1
- [x] Task 2
...

All tasks complete! Ready to archive this change.
```

**Output On Pause (Issue Encountered)**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

**Options:**
1. <option 1>
2. <option 2>
3. Other approach

What would you like to do?
```

**Guardrails**
- Always open (or reuse) a PR from `main` before the first code change in step 7
- Never update git config; never force-push to `main`
- Use `gh` for all GitHub PR operations
- Keep going through tasks until done or blocked
- Always read context files before starting (from the apply instructions output)
- If task is ambiguous, pause and ask before implementing
- If implementation reveals issues, pause and suggest artifact updates
- Keep code changes minimal and scoped to each task
- Update task checkbox immediately after completing each task
- Pause on errors, blockers, or unclear requirements - don't guess
- Use contextFiles from CLI output, don't assume specific file names

**Fluid Workflow Integration**

This skill supports the "actions on a change" model:

- **Can be invoked anytime**: Before all artifacts are done (if tasks exist), after partial implementation, interleaved with other actions
- **Allows artifact updates**: If implementation reveals design issues, suggest updating artifacts - not phase-locked, work fluidly
