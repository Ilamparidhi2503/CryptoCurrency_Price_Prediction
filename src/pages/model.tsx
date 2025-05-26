import React from "react";
import { Card, CardBody, CardHeader, Button, Progress, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ModelAccuracyChart } from "../components/model-accuracy-chart";
import { ModelArchitectureDiagram } from "../components/model-architecture-diagram";
import { motion } from "framer-motion";

export function Model() {
  const [isTraining, setIsTraining] = React.useState(false);
  const [trainingProgress, setTrainingProgress] = React.useState(0);
  const [selected, setSelected] = React.useState("overview");

  // Mock training data for the accuracy chart
  const trainingData = Array.from({ length: 50 }, (_, epoch) => ({
    epoch: epoch + 1,
    accuracy: Math.min(0.5 + epoch * 0.01, 0.92) + (Math.random() * 0.03),
    val_accuracy: Math.min(0.48 + epoch * 0.009, 0.89) + (Math.random() * 0.03),
    loss: Math.max(0.5 - epoch * 0.009, 0.08) + (Math.random() * 0.02),
    val_loss: Math.max(0.55 - epoch * 0.008, 0.1) + (Math.random() * 0.02),
  }));

  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-2">AI Model</h1>
        <p className="text-default-500">
          Explore the architecture and performance of our cryptocurrency price prediction model.
        </p>
      </motion.div>

      <Tabs 
        aria-label="Model sections" 
        selectedKey={selected} 
        onSelectionChange={(key) => setSelected(key as string)}
      >
        <Tab
          key="overview"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:layers" className="h-4 w-4" />
              <span>Overview</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <ModelAccuracyChart trainingData={trainingData} />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium">Model Summary</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-small text-default-500">Model Type</span>
                      <span className="font-medium">LSTM Neural Network</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small text-default-500">Total Parameters</span>
                      <span className="font-medium">1,245,632</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small text-default-500">Training Accuracy</span>
                      <span className="font-medium">92.3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small text-default-500">Validation Accuracy</span>
                      <span className="font-medium">89.1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small text-default-500">Training Loss</span>
                      <span className="font-medium">0.0823</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small text-default-500">Validation Loss</span>
                      <span className="font-medium">0.1045</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      color="primary"
                      startContent={<Icon icon="lucide:refresh-cw" className="h-4 w-4" />}
                      isLoading={isTraining}
                      onPress={handleStartTraining}
                      fullWidth
                    >
                      {isTraining ? "Training..." : "Retrain Model"}
                    </Button>
                    
                    {isTraining && (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-small">Training Progress</span>
                          <span className="text-small">{trainingProgress}%</span>
                        </div>
                        <Progress
                          aria-label="Training progress"
                          value={trainingProgress}
                          color="primary"
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="mt-6">
            <ModelArchitectureDiagram />
          </div>
        </Tab>
        
        <Tab
          key="features"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:database" className="h-4 w-4" />
              <span>Features</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Input Features</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    {
                      name: "Price Data",
                      description: "Historical price data including open, high, low, close values",
                      importance: 95,
                      icon: "lucide:line-chart"
                    },
                    {
                      name: "Volume Indicators",
                      description: "Trading volume patterns and anomalies",
                      importance: 85,
                      icon: "lucide:bar-chart-2"
                    },
                    {
                      name: "Technical Indicators",
                      description: "RSI, MACD, Moving Averages, Bollinger Bands",
                      importance: 80,
                      icon: "lucide:activity"
                    },
                    {
                      name: "Market Sentiment",
                      description: "Social media sentiment analysis and news impact",
                      importance: 75,
                      icon: "lucide:message-square"
                    },
                    {
                      name: "On-Chain Metrics",
                      description: "Blockchain data like active addresses and transaction counts",
                      importance: 70,
                      icon: "lucide:link"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Icon icon={feature.icon} className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{feature.name}</span>
                        </div>
                        <span className="text-small">{feature.importance}%</span>
                      </div>
                      <p className="text-small text-default-500 pl-10">{feature.description}</p>
                      <Progress
                        aria-label={`${feature.name} importance`}
                        value={feature.importance}
                        color="primary"
                        className="h-1"
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Feature Engineering</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  {[
                    {
                      name: "Time Series Transformation",
                      description: "Converting raw price data into sequential patterns for LSTM processing",
                      steps: [
                        "Window creation (sequence length: 60 days)",
                        "Normalization using MinMaxScaler",
                        "Sequence padding and alignment"
                      ]
                    },
                    {
                      name: "Technical Indicator Calculation",
                      description: "Deriving technical indicators from price and volume data",
                      steps: [
                        "Moving averages (7, 21, 50 days)",
                        "RSI with 14-day period",
                        "MACD with 12/26/9 configuration",
                        "Bollinger Bands with 20-day period"
                      ]
                    },
                    {
                      name: "Sentiment Analysis",
                      description: "Processing social media and news data for sentiment signals",
                      steps: [
                        "NLP-based text classification",
                        "Sentiment scoring (-1 to +1)",
                        "Volume-weighted sentiment aggregation",
                        "Temporal sentiment trend calculation"
                      ]
                    }
                  ].map((process, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium">{process.name}</h4>
                      <p className="text-small text-default-500">{process.description}</p>
                      <div className="pl-4 space-y-1 mt-2">
                        {process.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center gap-2">
                            <Icon icon="lucide:check" className="h-4 w-4 text-primary" />
                            <span className="text-small">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
        
        <Tab
          key="performance"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:bar-chart-3" className="h-4 w-4" />
              <span>Performance</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <h3 className="text-lg font-medium">Prediction Accuracy by Timeframe</h3>
              </CardHeader>
              <CardBody className="h-[400px]">
                <ResponsiveBarChart />
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Performance Metrics</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mean Absolute Error (MAE)",
                      value: "2.34%",
                      description: "Average absolute difference between predictions and actual values"
                    },
                    {
                      name: "Root Mean Square Error (RMSE)",
                      value: "3.12%",
                      description: "Square root of the average squared differences"
                    },
                    {
                      name: "Directional Accuracy",
                      value: "87.5%",
                      description: "Percentage of correct price movement direction predictions"
                    },
                    {
                      name: "R² Score",
                      value: "0.892",
                      description: "Proportion of variance in the dependent variable predictable from the independent variables"
                    },
                    {
                      name: "Sharpe Ratio",
                      value: "1.78",
                      description: "Average return earned in excess of the risk-free rate per unit of volatility"
                    }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{metric.name}</span>
                        <span className="text-primary font-semibold">{metric.value}</span>
                      </div>
                      <p className="text-tiny text-default-500">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Cryptocurrency-Specific Performance</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    {
                      name: "Bitcoin (BTC)",
                      accuracy: 92,
                      icon: "logos:bitcoin"
                    },
                    {
                      name: "Ethereum (ETH)",
                      accuracy: 89,
                      icon: "logos:ethereum"
                    },
                    {
                      name: "Cardano (ADA)",
                      accuracy: 84,
                      icon: "logos:cardano"
                    },
                    {
                      name: "Solana (SOL)",
                      accuracy: 86,
                      icon: "logos:solana"
                    },
                    {
                      name: "Polkadot (DOT)",
                      accuracy: 82,
                      icon: "logos:polkadot"
                    }
                  ].map((crypto, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon icon={crypto.icon} className="h-5 w-5" />
                          <span className="font-medium">{crypto.name}</span>
                        </div>
                        <span className="text-small">{crypto.accuracy}%</span>
                      </div>
                      <Progress
                        aria-label={`${crypto.name} prediction accuracy`}
                        value={crypto.accuracy}
                        color={crypto.accuracy > 85 ? "success" : crypto.accuracy > 80 ? "primary" : "warning"}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Model Comparison</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    {
                      name: "LSTM (Current)",
                      accuracy: 89.2,
                      description: "Our current Long Short-Term Memory neural network model"
                    },
                    {
                      name: "GRU",
                      accuracy: 87.5,
                      description: "Gated Recurrent Unit neural network"
                    },
                    {
                      name: "Transformer",
                      accuracy: 86.8,
                      description: "Attention-based transformer architecture"
                    },
                    {
                      name: "Random Forest",
                      accuracy: 78.4,
                      description: "Ensemble learning method using decision trees"
                    },
                    {
                      name: "ARIMA",
                      accuracy: 72.1,
                      description: "Traditional time series forecasting model"
                    }
                  ].map((model, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {model.name === "LSTM (Current)" && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20">
                              <Icon icon="lucide:check" className="h-3 w-3 text-success" />
                            </div>
                          )}
                          <span className={`font-medium ${model.name === "LSTM (Current)" ? "text-success" : ""}`}>
                            {model.name}
                          </span>
                        </div>
                        <span className="text-small">{model.accuracy}%</span>
                      </div>
                      <p className="text-tiny text-default-500 pl-7">{model.description}</p>
                      <Progress
                        aria-label={`${model.name} accuracy`}
                        value={model.accuracy}
                        color={model.name === "LSTM (Current)" ? "success" : "primary"}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

// Responsive Bar Chart Component
function ResponsiveBarChart() {
  const data = [
    { timeframe: "1 Day", accuracy: 78.4 },
    { timeframe: "3 Days", accuracy: 82.1 },
    { timeframe: "1 Week", accuracy: 85.7 },
    { timeframe: "2 Weeks", accuracy: 87.9 },
    { timeframe: "1 Month", accuracy: 89.2 },
    { timeframe: "3 Months", accuracy: 84.5 },
    { timeframe: "6 Months", accuracy: 79.8 },
  ];

  return (
    <div className="w-full h-full">
      <div className="recharts-responsive-container" style={{ width: "100%", height: "100%" }}>
        <div className="recharts-wrapper" style={{ width: "100%", height: "100%" }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400" className="recharts-surface">
            {/* Y-Axis */}
            <g className="recharts-layer recharts-cartesian-axis recharts-yAxis">
              <line x1="60" y1="40" x2="60" y2="360" stroke="#e5e7eb" />
              {[0, 20, 40, 60, 80, 100].map((tick, i) => (
                <g key={i}>
                  <line x1="55" y1={360 - tick * 3.2} x2="60" y2={360 - tick * 3.2} stroke="#e5e7eb" />
                  <text x="45" y={365 - tick * 3.2} textAnchor="end" fill="#6b7280" fontSize="12">
                    {tick}%
                  </text>
                </g>
              ))}
            </g>
            
            {/* X-Axis */}
            <g className="recharts-layer recharts-cartesian-axis recharts-xAxis">
              <line x1="60" y1="360" x2="760" y2="360" stroke="#e5e7eb" />
              {data.map((entry, i) => (
                <text 
                  key={i} 
                  x={60 + (i + 0.5) * 100} 
                  y="380" 
                  textAnchor="middle" 
                  fill="#6b7280" 
                  fontSize="12"
                >
                  {entry.timeframe}
                </text>
              ))}
            </g>
            
            {/* Grid Lines */}
            {[20, 40, 60, 80].map((tick, i) => (
              <line 
                key={i} 
                x1="60" 
                y1={360 - tick * 3.2} 
                x2="760" 
                y2={360 - tick * 3.2} 
                stroke="#e5e7eb" 
                strokeDasharray="3 3" 
              />
            ))}
            
            {/* Bars */}
            {data.map((entry, i) => (
              <g key={i}>
                <rect
                  x={60 + i * 100 + 20}
                  y={360 - entry.accuracy * 3.2}
                  width="60"
                  height={entry.accuracy * 3.2}
                  fill="url(#barGradient)"
                  rx="4"
                />
                <text
                  x={60 + i * 100 + 50}
                  y={355 - entry.accuracy * 3.2}
                  textAnchor="middle"
                  fill="#4b5563"
                  fontSize="12"
                  fontWeight="500"
                >
                  {entry.accuracy}%
                </text>
              </g>
            ))}
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0967d2" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#0967d2" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}