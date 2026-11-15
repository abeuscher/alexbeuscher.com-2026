---
type: feature
variant: reverse
eyebrow: The result
heading: NpHelper
meta: Open source · CRM and website platform for small nonprofits
image: /images/work/nphelper.jpg
imageAlt: The NpHelper home page, headed "CRM and website software for small nonprofits"
tech: [Laravel, Filament, PostgreSQL, Docker, Stripe, Pest, Playwright, Claude Code]
actions:
  - label: Try the live demo
    href: https://nphelper.com/demo
  - label: Read the session logs
    href: https://github.com/abeuscher/npc-beta/tree/main/sessions
  - label: View the code
    href: https://github.com/abeuscher/npc-beta
---
NpHelper runs membership, donations, event ticketing, and a public website from one self-hosted system. It's deployed, it has a public demo, and it integrates Stripe for payments.

It has a thin core with each feature area as a separate plugin in its own repository, role-based permissions, an enforced content security policy, and a CSV importer that refuses files containing card or Social Security numbers.
