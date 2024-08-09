<div align="center">

# Concourse Discord Webhook Resource

**Resource for ConcourseCI to send messages as a Discord webhook**

[![GitHub](https://img.shields.io/github/license/favware/discord-application-emojis-manager)](https://github.com/favware/discord-application-emojis-manager/blob/main/LICENSE)

[![Support Server](https://discord.com/api/guilds/512303595966824458/embed.png?style=banner2)](https://join.favware.tech)

</div>

## Usage

### Resource Type Configuration

```yaml
resource_types:
  - name: discord-webhook-resource
    type: docker-image
    source:
      repository: favware/concourse-discord-webhook-resource
```

### Resource Configuration Example

```yaml
resources:
  - name: discord
    type: discord-webhook-resource
    check_every: 999999h
    source:
      token: ((token))
```

## Behaviour

### `check`: Not implemented.

### `in`: Not implemented.

### `out`: Send message using a webhook.

Send message using a Discord webhook with the configured parameters. Parameters
can be passed in using the
[params](https://concourse-ci.org/jobs.html#schema.step.put-step.params) key on
the `put` step or passed in via files.

#### Parameters: `params`

**The parameters mimic the bulk of the parameters from
https://discord.com/developers/docs/resources/webhook#execute-webhook.**

- `content` (**required**) (_string_): The message contents (up to 2000
  characters)
- `username` (_string_): Override the default username of the webhook
- `avatar_url` (_string)_: Any text wanted to ultimately appear on the page as
  the title of the message.
- `allowed_mentions_roles` (_array of strings_): Roles that are allowed to be
  mentioned (default: `[]`).
- `allowed_mentions_users` (_array of strings_): Users that are allowed to be
  mentioned (default: `[]`).
- `allowed_mentions_everyone` (_boolean_): Whether `@everyone` and `@here` are
  allowed to be mentioned (default: `false`)
- `flags` (_integer_):
  [message flags](https://discord.com/developers/docs/resources/message#message-object-message-flags)
  combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only
  `SUPPRESS_EMBEDS` and `SUPPRESS_NOTIFICATIONS` can be set can be set)

## Usage Examples

```yaml
jobs:
  - name: discord-send
    plan:
      - put: discord
        params:
          content: |
            "Hello world!"
```

## Buy us some doughnuts

Favware projects are and always will be open source, even if we don't get
donations. That being said, we know there are amazing people who may still want
to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Ko-fi, Paypal, Patreon, GitHub Sponsorships, and
various cryptocurrencies. You can use the buttons below to donate through your
method of choice.

|   Donate With   |                      Address                      |
| :-------------: | :-----------------------------------------------: |
|      Ko-fi      |  [Click Here](https://donate.favware.tech/kofi)   |
|     Patreon     | [Click Here](https://donate.favware.tech/patreon) |
|     PayPal      | [Click Here](https://donate.favware.tech/paypal)  |
| GitHub Sponsors |  [Click Here](https://github.com/sponsors/Favna)  |
|     Bitcoin     |       `1E643TNif2MTh75rugepmXuq35Tck4TnE5`        |
|    Ethereum     |   `0xF653F666903cd8739030D2721bF01095896F5D6E`    |
|    LiteCoin     |       `LZHvBkaJqKJRa8N7Dyu41Jd1PDBAofCik6`        |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a
pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/favware/discord-application-emojis-manager/graphs/contributors">
  <img alt="contributors" src="https://contrib.rocks/image?repo=favware/discord-application-emojis-manager" />
</a>

[contributing]: ./.github/CONTRIBUTING.md
