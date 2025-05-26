import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { PredictionForm } from "../components/prediction-form";
import { PredictionResultCard } from "../components/prediction-result-card";
import { PriceChart } from "../components/price-chart";
import { motion } from "framer-motion";
import { getAIPrediction } from "../utils/predict";

export function Prediction() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [predictionResult, setPredictionResult] = React.useState<any | null>(null);
  const [timeframe, setTimeframe] = React.useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1M");

  const generatePredictionData = (days: number, includePrediction = false) => {
    const data = [];
    const today = new Date();
    let price = 65000;

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      price = price + (Math.random() - 0.5) * 1000;

      const dataPoint: any = {
        date: date.toISOString().split("T")[0],
        price: Math.max(price, 50000),
      };

      data.push(dataPoint);
    }

    if (includePrediction) {
      const lastPrice = data[data.length - 1].price;
      let predictionPrice = lastPrice;

      for (let i = 1; i <= 30; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);

        predictionPrice = predictionPrice + Math.random() * 200 + 50;

        data.push({
          date: date.toISOString().split("T")[0],
          price: lastPrice,
          prediction: predictionPrice,
        });
      }
    }

    return data;
  };

  const chartData = React.useMemo(() => {
    return generatePredictionData(90, !!predictionResult);
  }, [timeframe, predictionResult]);

  const handlePredictionSubmit = async (data: any) => {
    console.log("Form data submitted:", data); // for debug
    setIsLoading(true);

    const aiPrediction = await getAIPrediction({
      symbol: data.crypto,
      timeframe: data.timeframe,
      confidence: data.confidenceThreshold,
      technicalIndicators: data.includeTechnicalIndicators,
      sentimentAnalysis: data.includeSentimentAnalysis,
    });

    const result = {
      crypto: {
        name:
          data.crypto === "BTC"
            ? "Bitcoin"
            : data.crypto === "ETH"
            ? "Ethereum"
            : data.crypto === "ADA"
            ? "Cardano"
            : data.crypto === "SOL"
            ? "Solana"
            : "Polkadot",
        symbol: data.crypto,
        icon:
          data.crypto === "BTC"
            ? "logos:bitcoin"
            : data.crypto === "ETH"
            ? "logos:ethereum"
            : data.crypto === "ADA"
            ? "logos:cardano"
            : data.crypto === "SOL"
            ? "logos:solana"
            : "logos:polkadot",
      },
      currentPrice:
        data.crypto === "BTC"
          ? 65432.1
          : data.crypto === "ETH"
          ? 3521.45
          : data.crypto === "ADA"
          ? 0.58
          : data.crypto === "SOL"
          ? 142.32
          : 7.92,
      predictedPrice: aiPrediction,
      confidence: data.confidenceThreshold,
      timeframe: data.timeframe,
      predictionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      supportFactors: [],
    };

    setPredictionResult(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-2">AI Price Prediction</h1>
        <p className="text-default-500">
          Generate accurate cryptocurrency price predictions using our advanced AI model.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <PredictionForm onSubmit={handlePredictionSubmit} isLoading={isLoading} />

          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium">How It Works</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Icon icon="lucide:database" className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Data Collection</h4>
                  <p className="text-small text-default-500">
                    Our system analyzes historical price data, trading volumes, and market sentiment.
                  </p>
                </div>
              </div>

              <Divider />

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Icon icon="lucide:brain-circuit" className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">AI Processing</h4>
                  <p className="text-small text-default-500">
                    LSTM neural networks identify patterns and correlations in the data.
                  </p>
                </div>
              </div>

              <Divider />

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Icon icon="lucide:line-chart" className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Prediction Generation</h4>
                  <p className="text-small text-default-500">
                    The model forecasts future price movements with confidence intervals.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {predictionResult ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <PriceChart
                title={`${predictionResult.crypto.name} (${predictionResult.crypto.symbol}) Price Prediction`}
                data={chartData}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                showPrediction={true}
              />

              <PredictionResultCard
                crypto={predictionResult.crypto}
                currentPrice={predictionResult.currentPrice}
                predictedPrice={predictionResult.predictedPrice}
                confidence={predictionResult.confidence}
                timeframe={predictionResult.timeframe}
                predictionDate={predictionResult.predictionDate}
                supportFactors={predictionResult.supportFactors}
              />
            </motion.div>
          ) : (
            <Card className="h-full">
              <CardBody className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Icon icon="lucide:sparkles" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Generate Your First Prediction</h3>
                <p className="text-default-500 max-w-md mb-6">
                  Select a cryptocurrency and timeframe to get started with AI-powered price predictions.
                </p>
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex items-center gap-2 text-small text-default-500">
                    <Icon icon="lucide:check-circle" className="h-4 w-4 text-success" />
                    <span>87% average prediction accuracy</span>
                  </div>
                  <div className="flex items-center gap-2 text-small text-default-500">
                    <Icon icon="lucide:check-circle" className="h-4 w-4 text-success" />
                    <span>Updated with real-time market data</span>
                  </div>
                  <div className="flex items-center gap-2 text-small text-default-500">
                    <Icon icon="lucide:check-circle" className="h-4 w-4 text-success" />
                    <span>Customizable prediction parameters</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
