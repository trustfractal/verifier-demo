# Fractal Wallet - Verifier Demo

A web app implementing the site for a fictitious verifier.

This web app retrieves data from the user using the SDK provided by the
wallet extension and uses the Fractal SDK to validate if the
credentials are valid.

This project was built with [Next JS][next-js].

**Table of Contents**

- [Setup](#setup)
- [Development](#development)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [About](#about)

## Setup

First, clone & setup the repository:

```
git clone git@github.com:trustfractal/verifier-demo.git
yarn install
```

You'll need to set up the environment. To do so, run:

```
cp .env.example .env
```

Afterwards, fill in with the appropriate values.

## Development

To start the development environment, run:

```sh
$ bin/server
```

## Contribution Guidelines

Contributions must follow [Subvisual's guides](https://github.com/subvisual/guides).

## License

Wallet is copyright &copy; 2021 Trust Fractal GmbH.

It is open-source, made available for free, and is subject to the terms in its [license].

## About

Fractal Wallet was created and is maintained with :heart: by [Fractal Protocol][fractal].

[license]: ./LICENSE
[fractal]: https://protocol.fractal.id/
