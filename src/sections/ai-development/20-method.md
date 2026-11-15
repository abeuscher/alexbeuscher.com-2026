---
type: prose
anchor: method
heading: Principles I work by
---
An AI agent writes code quickly. Whether that code can be trusted depends on the process around it. These are the principles I work by, and NpHelper's public repository shows them in use.

- **One session, one written brief.** A session starts from a prompt that states the scope and what done means, and ends with a log of what changed and why. Nearly 400 of them are in the repository.
- **The agent proposes and a person merges.** The agent works on its own branch. Merging to the main branch is my job, after I've read the change, and a git hook backs that rule up.
- **Tests are the gate.** The full suite runs on every push. Browser tests cover the real interface, including accessibility checks, and mutation testing checks that the tests themselves would catch a bug.
- **Decisions are written down.** Architecture decision records explain why the system is built the way it is, so the agent and I work from the same reasons in every session.
- **The agent stops at milestones.** When an iteration is ready to deploy and test, it stops and waits for me.
