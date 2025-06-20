# Stock Market Simulator

A React Native app for simulated stock trading and learning about the stock market.

## Features

- Real-time stock market data
- Portfolio management
- Watchlist functionality
- Price alerts
- Social features and leaderboard
- Educational content

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Finnhub API key
- Firebase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd stock-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a copy of `src/config/env.ts.example` as `src/config/env.ts`
   - Replace the placeholder values with your actual API keys and configuration

4. Start the development server:
```bash
npm start
```

5. Run on your device:
   - Install the Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or press 'i' for iOS simulator / 'a' for Android emulator

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── config/        # Configuration files
  ├── constants/     # Theme and other constants
  ├── navigation/    # Navigation configuration
  ├── screens/       # Screen components
  ├── services/      # API and business logic
  └── types/         # TypeScript type definitions
```

## Technologies Used

- React Native
- Expo
- TypeScript
- Firebase
- Finnhub API
- React Navigation
- React Native Paper

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Finnhub.io for providing market data
- React Native community for excellent documentation and support
- All contributors who help improve this project 