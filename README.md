# Açık Kuran Frontend

[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

<img src="https://raw.githubusercontent.com/ziegfiroyt/acikkuran-api/main/logo.png" width="100" alt="Apaçık Kur'an'a andolsun!">

[https://acikkuran.com](https://acikkuran.com)

"O mankind: there has come to you evidence from your Lord; and We have sent down to you a clear light."
— [Qur'an 4:174](https://quran.so/4/174)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Acikkuran.com is an open-source project founded on the principles of volunteerism, with the mission of providing people with simple, ad-free, and easy-to-use access to the Qur'an. It is a non-profit initiative that does not pursue any financial or moral gain.

Acikkuran.com operates independently and is not affiliated with any group, community, ideology, institution, organization, association, or foundation.

All service and server expenses are covered by support from [Patreon](https://patreon.com/acikkuran).

## Features

- An interface that allows people to read and study the Qur'an in a simple, ad-free, and user-friendly manner.
- The multilingual infrastructure of the site is hosted at [acikkuran.com](https://acikkuran.com) for Turkish and [quran.so](https://quran.so) for English, with plans to add support for other languages later.
- Membership login allows users to customize their reading habits and track their reading times.
  - It utilizes the NextAuth package for authentication, supporting Google and email login providers.
  - Single-use codes for login authentication can be sent via email, enhancing security and user verification.
- List of the root meanings of words mentioned in the verses and where these roots appear in other verses.
- Lots of Turkish and English translations and interpretations, sortable and selectable. (Translations in other languages will also be added)
- Player that plays audio files in English and Turkish translations.
- Support for both dark and light themes.
- Viewable on all devices including mobile, tablet, and desktop.
- PWA (Progressive Web App) support: Includes features that enhance the web application experience, such as the ability to install the app on users' devices and offer an app-like experience, but currently does not support offline access.
- AMP (Accelerated Mobile Pages) support: Features that adhere to AMP standards, optimizing page loading times and providing a streamlined mobile browsing experience, beneficial for improved visibility in Google search results.

## Getting Started

To get started with the application, follow these steps:

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/ziegfiroyt/acikkuran-frontend
```

2. Copy the .env.example file to .env and fill in the relevant fields:

```bash
cp .env.example .env
```

3. Open the .env file in your preferred text editor and fill in the required environment variables.

4. Install dependencies:

```bash
cd acikkuran-frontend
yarn install
```

### Usage

Start the development server:

```bash
yarn dev
```

_Note: Membership-related features (endpoints in the /api folder) require Hasura integration in the .env file. A test Hasura environment and membership migrations will be provided soon._

## Contributing

Thank you for considering contributing to our project. Your contributions can help improve the project and grow our community. To ensure smooth collaboration, please follow these guidelines:

1. **Check for Issues:** Before starting work on a new feature or issue, check the existing issues to see if it has already been reported or if someone else is already working on it. If not, feel free to open a new issue to discuss your proposed changes.

2. **Fork the Repository:** If you plan to contribute, fork the repository to your GitHub account and create a new branch for your work. This makes it easier to manage changes and submit pull requests.

3. **Work on Your Changes:** Make your changes in your forked repository. Remember to write clear and concise commit messages that describe the purpose of your changes.

   - If your frontend development requires changes in the backend as well, please feel free to reach out. Our backend repository is also open source. Check this out: [Açık Kuran API](https://github.com/ziegfiroyt/acikkuran-api)

4. **Submitting Changes:** When you're ready to submit your changes:

   - Ensure that your code follows the project's coding conventions. (There is no guide yet, code is the guide)
   - Test your changes thoroughly to avoid introducing new bugs.
   - Create a pull request (PR) to the main repository's `main` branch.
   - Provide a detailed description of your changes in the PR, including the problem solved and any relevant information for reviewers.

5. **Review and Collaboration:** Once your PR is submitted, it will be reviewed by project maintainers or contributors. Be open to feedback and be willing to make changes if necessary. Collaboration is key to the success of the project.

6. **Thank You!** Every contribution, no matter how small, is valuable to us. Thank you for taking the time to contribute to our project and help make it better for everyone.

## License

This project is protected under the [CC BY-NC-SA 4.0 DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/) license, please review the license details.
