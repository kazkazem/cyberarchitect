# Newsletter connection checklist

Status: newsletter pages and RSS are live-ready; email collection remains disabled at Kaz's request to revisit account details later. No subscriber records are collected or simulated.

1. Choose an existing newsletter provider or establish an account under Kaz's control.
2. Confirm the public sender identity, reply-to inbox and business details.
3. Configure domain authentication using the provider's exact DNS records, preserving existing records.
4. Enable confirmation and unsubscribe handling. Review the provider's consent records, export and deletion tools.
5. Update the privacy page with controller contact, provider, purpose, retention and rights information before enabling collection.
6. Test signup using an authorised test address: confirmation, subscribed status, welcome email, unsubscribe and suppression.
7. Put the verified hosted subscription URL in content/site.json at newsletter.url and set newsletter.verified to true only after the preceding checks.
8. Publish and verify the hosted destination opens. The website links to the provider's signup page; it does not claim subscription success itself.

The RSS feed at /feed.xml is available without an email account. Add dated editorial entries in src/launch.mjs, and publish the matching article route.

Source references, checked 20 October 2026:
- https://docs.buttondown.com/building-your-subscriber-base (one possible integration, not an account already selected)
- https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/
