import React from "react";
import { Card, CardBody, CardHeader, Tabs, Tab, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CryptoPriceCard } from "../components/crypto-price-card";
import { PriceChart } from "../components/price-chart";
import { ModelStatsCard } from "../components/model-stats-card";
import { MarketOverviewCard } from "../components/market-overview-card";
import { motion } from "framer-motion";

export function Dashboard() {
  const [timeframe, setTimeframe] = React.useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1M");
  const [selectedCrypto, setSelectedCrypto] = React.useState("BTC");
  // Mock data for crypto prices
  const cryptoData = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 65432.10,
      change24h: 2.34,
      icon: "logos:bitcoin",
      marketCap: 1245000000000,
      volume24h: 32500000000
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 3521.45,
      change24h: 1.87,
      icon: "logos:ethereum",
      marketCap: 421000000000,
      volume24h: 18700000000
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: 0.58,
      change24h: -1.23,
      icon: "logos:cardano",
      marketCap: 20500000000,
      volume24h: 980000000
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 142.32,
      change24h: 5.67,
      icon: "logos:solana",
      marketCap: 61200000000,
      volume24h: 4300000000
    }
  ];

  // Mock data for price chart

  const chartData = React.useMemo(() => {
  let basePrice = 65000;
  if (selectedCrypto === "ETH") basePrice = 3500;
  if (selectedCrypto === "ADA") basePrice = 0.6;
  if (selectedCrypto === "SOL") basePrice = 140;

  const generateChartData = (days: number) => {
    const data = [];
    const today = new Date();
    let price = basePrice;
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      price = price + (Math.random() - 0.5) * (basePrice * 0.02);
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(price, basePrice * 0.5)
      });
    }
    return data;
  };

  switch (timeframe) {
    case "1D":
      return generateChartData(1);
    case "1W":
      return generateChartData(7);
    case "1M":
      return generateChartData(30);
    case "3M":
      return generateChartData(90);
    case "1Y":
      return generateChartData(365);
    case "ALL":
      return generateChartData(1000);
    default:
      return generateChartData(30);
  }
}, [timeframe, selectedCrypto]);

  // Add function to handle crypto selection
  const handleCryptoSelect = (symbol: string) => {
  setSelectedCrypto(symbol);
};

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-default-500">
          Welcome to your CryptoPredict AI dashboard. Monitor crypto prices and AI predictions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cryptoData.map((crypto, index) => (
          <CryptoPriceCard
            key={crypto.symbol}
            name={crypto.name}
            symbol={crypto.symbol}
            price={crypto.price}
            change24h={crypto.change24h}
            icon={crypto.icon}
            marketCap={crypto.marketCap}
            volume24h={crypto.volume24h}
            isSelected={selectedCrypto === crypto.symbol}
            onSelect={() => handleCryptoSelect(crypto.symbol)}
          />
        ))}
      </div>

      <Button aria-label="Close dialog">
  <Icon icon="lucide:x" />
</Button>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PriceChart
  title={`${cryptoData.find(c => c.symbol === selectedCrypto)?.name || selectedCrypto} (${selectedCrypto}) Price`}
  data={chartData}
  timeframe={timeframe}
  onTimeframeChange={setTimeframe}
/>
        </div>
        <div>
          <ModelStatsCard
            accuracy={87.5}
            loss={0.0823}
            trainingTime="4h 32m"
            lastUpdated="Today, 08:30 AM"
            epochs={100}
            modelType="LSTM Neural Network"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MarketOverviewCard />
      </div>
    </div>
  );
}