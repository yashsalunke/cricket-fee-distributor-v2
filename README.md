# Cricket Fee Distributor v2

A modern Angular application for calculating fair fee distribution among cricket players based on their performance statistics.

## Features

- **Batting Analysis**: Parses batting stats including runs, balls faced, and strike rate
- **Bowling Analysis**: Includes bowling figures, wickets, and economy rate
- **Fair Distribution**: Calculates contributions using opportunity scores and performance bonuses
- **Modern UI**: Responsive design with professional styling
- **Flexible Squads**: Handles teams larger than 11 players

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/`

### Build for Development
```bash
npm run build
```

## Production Setup

### Build for Production
```bash
npm run build:prod
```

This creates optimized, minified files in the `dist/cricket-fee-distributor-v2/` directory.

### Serve Production Build Locally
```bash
npm run serve:prod
```
Access at `http://localhost:8080`

### One-Command Production Setup
```bash
npm run prod
```
This builds and serves the production version in one command.

## Deployment Options

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. The `netlify.toml` file configures the build automatically:
   - **Build Command**: `ng build --prod`
   - **Publish Directory**: `dist/cricket-fee-distributor-v2`
   - **Node Version**: 18
3. The Angular Runtime plugin handles the Angular CLI installation
4. Or manually set the build settings in Netlify dashboard

### Docker Deployment
Build and run with Docker:
```bash
docker build -t cricket-fee-distributor .
docker run -p 8080:80 cricket-fee-distributor
```
Access at `http://localhost:8080`

The `Dockerfile` uses multi-stage builds for optimal image size.

## Usage

1. Paste your team's batting scorecard in the "Batting Stats" textarea
2. Paste the bowling scorecard in the "Bowling Stats" textarea
3. Enter the total amount to distribute
4. Click "Calculate Distribution"
5. View the fair fee breakdown for each player

## Input Format Examples

### Batting Stats
```
No Batsman Status R B M 4s 6s SR
1 Ram Kirar (RHB) c Sujit Chavan b Abhilash 29 19 23 4 1 152.63
2 Pawan Verma (LHB) c DEEPAK LATAD b Mayur Dhaye 1 3 5 0 0 33.33
```

### Bowling Stats
```
No Bowler O M R W 0s 4s 6s WD NB Eco
1 KD - Kedaresh Angadi 3 0 33 0 5 3 2 0 0 11.00
2 Pawan Verma 2 0 25 0 1 2 1 2 0 12.50
```

## Architecture

- **Frontend**: Angular 18 with TypeScript
- **Styling**: Custom CSS with responsive design
- **Build**: Angular CLI with production optimizations
- **Deployment**: Static hosting ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.