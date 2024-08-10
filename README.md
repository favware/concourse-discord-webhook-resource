<div align="center">

# Concourse Discord Webhook Resource

**Resource for ConcourseCI to send messages as a Discord webhook**

[![GitHub](https://img.shields.io/github/license/favware/discord-application-emojis-manager)](https://github.com/favware/discord-application-emojis-manager/blob/main/LICENSE)

[![Support Server](https://discord.com/api/guilds/512303595966824458/embed.png?style=banner2)](https://join.favware.tech)

</div>

> [!IMPORTANT]
>
> This has only been tested with ConcourseCI 7.11.2 and may not work with older
> versions.

## Usage

### Resource Type Configuration

> [!NOTE]
>
> `docker.io` is the default public registry, https://hub.docker.com.

```yaml
resource_types:
  - name: discord-webhook-resource
    type: registry-image
    source:
      repository: docker.io/favware/concourse-discord-webhook-resource
      tag: latest
    check_every: 24h
```

**Alternatively pull the image from the GitHub registry**

```yaml
resource_types:
  - name: discord-webhook-resource
    type: registry-image
    source:
      repository: ghcr.io/favware/concourse-discord-webhook-resource
      tag: latest
    check_every: 24h
```

> [!NOTE]
>
> The `tag: latest` source property is optional, as the value `latest` in the
> default.

### Resource Configuration Example

To setup an incoming webhook, create it in Discord on the desired channel, then
configure the URL in the resource configuration.

- `url` (**required**) (_string_): The webhook URL as provided by Discord.
  Always in the format: `https://discord.com/api/webhooks/XXXX/ZZZZ` wherein
  `XXXX` is the webhook ID and `ZZZZ` is the webhook token.

- `insecure`: _Optional._ Connect to Slack insecurely - i.e. skip SSL
  validation. Defaults to `false` if not provided.

- `proxy`: _Optional._ Connect to Slack using an HTTP(S) proxy. In the form:
  `http://my.proxy:3128`.

- `disable`: _Optional._ Set to `true` to skip all messaging. Convenient for
  temporarily disabling notifications without editing your pipelines.

#### Example

```yaml
resources:
  - name: discord-notification
    type: discord-webhook-resource
    icon: discord
    check_every: 24h
    source:
      url: https://discord.com/api/webhooks/XXXX/ZZZZ
```

## Behaviour

### `check` Step (`check` script): No operation

Checking for new version always returns the last timestamp-based dummy version,
created when the last `put` step was executed on this resource.

### `get` Step (`in` script): No operation

Getting a new version of this resource does nothing else that always returning
the last timestamp-based dummy version, created when the last `put` step was
executed on this resource.

### `put` Step (`out` script): Sends a message to Discord.

Send message using a Discord webhook with the configured parameters. Parameters
can be passed in using the
[params](https://concourse-ci.org/jobs.html#schema.step.put-step.params) key on
the `put` step or passed in via files.

#### Parameters: `params`

**The parameters mimic the bulk of the parameters from
https://discord.com/developers/docs/resources/webhook#execute-webhook.**

- `content` (**required**) (_string_): The message contents (up to 2000
  characters). For formatting your content see
  [Markdown Text 101](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline).

You can add the following parameters in your content that will be replaced with
their respective ConcourseCI values:

- ATC_EXTERNAL_URL - The external URL to your ConcourseCI instance
- BUILD_ID - The ID of the build
- BUILD_JOB_ID - The ID of the job
- BUILD_JOB_NAME - The name of the job
- BUILD_NAME - The name of the build
- BUILD_PIPELINE_ID - The ID of the pipeline
- BUILD_PIPELINE_NAME - The name of the pipeline
- BUILD_TEAM_ID - The ID of the team
- BUILD_TEAM_NAME - The name of the team

To insert these values, use the following syntax: `${BUILD_ID}` or `$BUILD_ID`

- `username` (_string_): Override the default username of the webhook
- `avatar_url` (_string)_: Any text wanted to ultimately appear on the page as
  the title of the message.
- `allowed_mentions` (_object_): Allowed mentions for the message.
  - `.roles` (_array of strings_): Roles that are allowed to be mentioned
    (default: `[]`).
  - `.users` (_array of strings_): Users that are allowed to be mentioned
    (default: `[]`).
- `flags` (_object_): An object of the allowed values from
  [message flags](https://discord.com/developers/docs/resources/message#message-object-message-flags)
  - `.suppress_embeds` (_boolean_): Do not include any embeds when serializing
    this message (default: `false`).
  - `.suppress_notifications` (_boolean_): This message will not trigger push
    and desktop notifications (default: `false`).
- `verbose` (_boolean_): Whether to print verbose messages during the process
  (useful for debugging) (default: `false`).

## Usage Examples

```yaml
jobs:
  - name: discord-send
    plan:
      - put: discord-notification
        params:
          content: |
            The build had a result. Check it out at:
            ${ATC_EXTERNAL_URL}/teams/${BUILD_TEAM_NAME}/pipelines/${BUILD_PIPELINE_NAME}/jobs/${BUILD_JOB_NAME}/builds/${BUILD_NAME}
            or at:
            ${ATC_EXTERNAL_URL}/builds/${BUILD_ID}
```

**With all parameters**

```yaml
jobs:
  - name: discord-send
    plan:
      - put: discord-notification
        params:
          content: |
            The build had a result. Check it out at:
            ${ATC_EXTERNAL_URL}/teams/${BUILD_TEAM_NAME}/pipelines/${BUILD_PIPELINE_NAME}/jobs/${BUILD_JOB_NAME}/builds/${BUILD_NAME}
            or at:
            ${ATC_EXTERNAL_URL}/builds/${BUILD_ID}
          username: ConcourseCI
          avatar_url: https://github.com/cloudfoundry-community.png
          allowed_mentions:
            roles:
              - 123456789012345678
              - 234567890123456789
            users:
              - 345678901234567890
              - 456789012345678901
          flags:
            suppress_embeds: false
            suppress_notifications: false
          verbose: true
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
