# cilia-react-native

Cilia mobile app for iOS and Android.

[![Build status](https://build.appcenter.ms/v0.1/apps/845848b1-7937-494b-8d7f-9943e9026fed/branches/main/badge)](https://appcenter.ms)

## 1. Development

### 1.1. Getting Started

If you have not installed dependencies yet, run the following:

```bash
$ yarn install
$ npx pod-install
```

To start development, open 2 terminal prompts and run the following in the first terminal:

```bash
$ yarn start
```

In the second terminal, run the following for iOS development:

```bash
$ yarn ios
```

Or run the following for Android development:

```bash
$ yarn android
```

_Note: Android development was not actively tested. So, it may require some actions._

### 1.2. Building Cilia with Xcode or deploying to a physical device

If you installed `node` with homebrew, the installation path should be `/opt/homebrew/bin/node`. But, when we build React Native projects with Xcode itself for running the app on a physical device, React Native expects `node` at `/usr/local/bin/node` path. React Native provides a way to override this behavior (setting `NODE_BINARY` environment variable in "Bundle React Native code and images" in Xcode). But it's simply ignored. There are several issues regarding to that (e.g https://github.com/facebook/react-native/issues/31260).

To overcome this issue, you can modify `PATH` environment variable in the Bash profile:

```bash
$ echo '\nexport PATH="/opt/homebrew/opt/node@16/bin:$PATH"' >> ~/.profile
```

_Notice we used Node 16 LTS in this example._

### 1.3. Updating splash screen

If you need to update the splash screen, run the following command to auto-generate splash screen files:

```bash
$ yarn react-native generate-bootsplash ./src/assets/images/logo.png --background-color=53C38B --logo-width=174
```

## 2. Staging Platform Environment

For working with GraphQL operations, you can use the following URLs:

| API      | URL                                                     |
| -------- | ------------------------------------------------------- |
| Platform | https://platformapi-staging.possiblyfaulty.com/graphiql |
| Admin    | https://adminapi-staging.possiblyfaulty.com/graphiql    |
