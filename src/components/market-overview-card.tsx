import React from "react";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface MarketItem {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
}

export function MarketOverviewCard() {
  const trendingCoins: MarketItem[] = [
    {
      name: "Solana",
      symbol: "SOL",
      price: 142.32,
      change24h: 5.67,
      icon: "logos:solana"
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      price: 35.78,
      change24h: 4.21,
      icon: "logos:avalanche"
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: 7.92,
      change24h: 3.45,
      icon: "logos:polkadot"
    }
  ];
  
  const gainers: MarketItem[] = [
    {
      name: "Injective",
      symbol: "INJ",
      price: 28.45,
      change24h: 12.34,
      icon: "logos:ethereum"
    },
    {
      name: "Render",
      symbol: "RNDR",
      price: 7.82,
      change24h: 9.87,
      icon: "logos:ethereum"
    },
    {
      name: "Sui",
      symbol: "SUI",
      price: 1.67,
      change24h: 8.92,
      icon: "logos:ethereum"
    }
  ];
  
  const losers: MarketItem[] = [
    {
      name: "Aptos",
      symbol: "APT",
      price: 8.23,
      change24h: -6.78,
      icon: "logos:ethereum"
    },
    {
      name: "Internet Computer",
      symbol: "ICP",
      price: 11.45,
      change24h: -5.43,
      icon: "logos:ethereum"
    },
    {
      name: "Filecoin",
      symbol: "FIL",
      price: 4.92,
      change24h: -4.21,
      icon: "logos:ethereum"
    }
  ];

  const renderCoinList = (coins: MarketItem[]) => (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin, index) => (
          <Link to={`/app/dashboard/${coin.symbol.toLowerCase()}`} key={index} className="block">
            <div className="flex items-center justify-between p-4 rounded-medium bg-content2 hover:bg-content3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Icon icon={coin.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">{coin.name}</h4>
                  <p className="text-small text-default-500">{coin.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${coin.price.toLocaleString()}</p>
                <p className={`text-small ${coin.change24h >= 0 ? "text-success" : "text-danger"}`}>
                  {coin.change24h >= 0 ? "+" : ""}{coin.change24h}%
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Market Overview</h3>
      </CardHeader>
      <CardBody>
        <Tabs aria-label="Market data">
          <Tab 
            key="trending" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:trending-up" className="h-4 w-4" />
                <span>Trending</span>
              </div>
            }
          >
            {renderCoinList(trendingCoins)}
          </Tab>
          <Tab 
            key="gainers" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:arrow-up-right" className="h-4 w-4" />
                <span>Top Gainers</span>
              </div>
            }
          >
            {renderCoinList(gainers)}
          </Tab>
          <Tab 
            key="losers" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:arrow-down-right" className="h-4 w-4" />
                <span>Top Losers</span>
              </div>
            }
          >
            {renderCoinList(losers)}
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}