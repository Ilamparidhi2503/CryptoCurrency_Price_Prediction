import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Chip, Divider, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { PriceChart } from "../components/price-chart";
import { motion } from "framer-motion";

interface CryptoDetailParams {
  cryptoId: string;
}

export function CryptoDetail() {
  const { cryptoId } = useParams<CryptoDetailParams>();
  const history = useHistory();
  const [timeframe, setTimeframe] = React.useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1M");
  const [activeTab, setActiveTab] = React.useState("overview");
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  // Mock data for the selected cryptocurrency
  const cryptoData = React.useMemo(() => {
    // This would come from an API in a real app
    const cryptos = {
      btc: {
        name: "Bitcoin",
        symbol: "BTC",
        price: 65432.10,
        change24h: 2.34,
        icon: "logos:bitcoin",
        marketCap: 1245000000000,
        volume24h: 32500000000,
        circulatingSupply: 19500000,
        maxSupply: 21000000,
        allTimeHigh: 69000,
        description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
        website: "https://bitcoin.org",
        whitepaper: "https://bitcoin.org/bitcoin.pdf",
        explorer: "https://blockchain.com/explorer"
      },
      eth: {
        name: "Ethereum",
        symbol: "ETH",
        price: 3521.45,
        change24h: 1.87,
        icon: "logos:ethereum",
        marketCap: 421000000000,
        volume24h: 18700000000,
        circulatingSupply: 120000000,
        maxSupply: null,
        allTimeHigh: 4860,
        description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.",
        website: "https://ethereum.org",
        whitepaper: "https://ethereum.org/whitepaper",
        explorer: "https://etherscan.io"
      },
      ada: {
        name: "Cardano",
        symbol: "ADA",
        price: 0.58,
        change24h: -1.23,
        icon: "logos:cardano",
        marketCap: 20500000000,
        volume24h: 980000000,
        circulatingSupply: 35300000000,
        maxSupply: 45000000000,
        allTimeHigh: 3.10,
        description: "Cardano is a proof-of-stake blockchain platform that says its goal is to allow 'changemakers, innovators and visionaries' to bring about positive global change.",
        website: "https://cardano.org",
        whitepaper: "https://docs.cardano.org/",
        explorer: "https://cardanoscan.io"
      },
      sol: {
        name: "Solana",
        symbol: "SOL",
        price: 142.32,
        change24h: 5.67,
        icon: "logos:solana",
        marketCap: 61200000000,
        volume24h: 4300000000,
        circulatingSupply: 430000000,
        maxSupply: null,
        allTimeHigh: 260,
        description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.",
        website: "https://solana.com",
        whitepaper: "https://solana.com/solana-whitepaper.pdf",
        explorer: "https://explorer.solana.com"
      },
      dot: {
        name: "Polkadot",
        symbol: "DOT",
        price: 7.92,
        change24h: 3.45,
        icon: "logos:polkadot",
        marketCap: 9800000000,
        volume24h: 420000000,
        circulatingSupply: 1240000000,
        maxSupply: null,
        allTimeHigh: 55,
        description: "Polkadot is an open-source sharded multichain protocol that connects and secures a network of specialized blockchains, facilitating cross-chain transfer of any data or asset types.",
        website: "https://polkadot.network",
        whitepaper: "https://polkadot.network/PolkaDotPaper.pdf",
        explorer: "https://polkascan.io"
      },
      avax: {
        name: "Avalanche",
        symbol: "AVAX",
        price: 35.78,
        change24h: 4.21,
        icon: "logos:avalanche",
        marketCap: 12700000000,
        volume24h: 890000000,
        circulatingSupply: 355000000,
        maxSupply: 720000000,
        allTimeHigh: 146,
        description: "Avalanche is the fastest smart contracts platform in the blockchain industry, as measured by time-to-finality.",
        website: "https://avax.network",
        whitepaper: "https://avax.network/white-papers",
        explorer: "https://explorer.avax.network"
      },
      link: {
        name: "Chainlink",
        symbol: "LINK",
        price: 14.56,
        change24h: -2.15,
        icon: "logos:chainlink",
        marketCap: 8500000000,
        volume24h: 650000000,
        circulatingSupply: 580000000,
        maxSupply: 1000000000,
        allTimeHigh: 52.70,
        description: "Chainlink is a decentralized oracle network that provides real-world data to smart contracts on the blockchain.",
        website: "https://chain.link",
        whitepaper: "https://chain.link/whitepaper",
        explorer: "https://explorer.chain.link"
      },
      matic: {
        name: "Polygon",
        symbol: "MATIC",
        price: 0.89,
        change24h: 1.25,
        icon: "logos:polygon",
        marketCap: 8900000000,
        volume24h: 520000000,
        circulatingSupply: 10000000000,
        maxSupply: 10000000000,
        allTimeHigh: 2.92,
        description: "Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks.",
        website: "https://polygon.technology",
        whitepaper: "https://polygon.technology/papers",
        explorer: "https://polygonscan.com"
      }
    };
    
    return cryptos[cryptoId as keyof typeof cryptos] || cryptos.btc;
  }, [cryptoId]);
  
  // Generate mock chart data
  const generateChartData = (days: number) => {
    const data = [];
    const today = new Date();
    let price = cryptoData.price;
    const volatility = cryptoData.price < 10 ? 0.05 : cryptoData.price < 100 ? 0.5 : 500;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Add some randomness to the price
      price = price + (Math.random() - 0.5) * volatility;
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(price, price * 0.8)
      });
    }
    
    return data;
  };

  const chartData = React.useMemo(() => {
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
  }, [timeframe, cryptoData.price]);
  
  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };
  
  const formatSupply = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };
  
  const isPositive = cryptoData.change24h >= 0;
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleBack = () => {
    history.push("/app/dashboard");
  };
  
  const handlePrediction = () => {
    history.push("/app/prediction");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="light" 
          startContent={<Icon icon="lucide:arrow-left" className="h-4 w-4" />}
          onPress={handleBack}
        >
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            color={isFavorite ? "warning" : "default"}
            onPress={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Icon 
              icon={isFavorite ? "lucide:star" : "lucide:star"} 
              className={`h-5 w-5 ${isFavorite ? "fill-warning" : ""}`} 
            />
          </Button>
          <Button
            color="primary"
            startContent={<Icon icon="lucide:sparkles" className="h-4 w-4" />}
            onPress={handlePrediction}
          >
            Generate Prediction
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon icon={cryptoData.icon} className="h-10 w-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{cryptoData.name}</h1>
              <Chip size="sm" variant="flat" className="text-default-500">{cryptoData.symbol}</Chip>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-semibold">${cryptoData.price.toLocaleString()}</span>
              <Chip
                color={isPositive ? "success" : "danger"}
                variant="flat"
                startContent={
                  <Icon 
                    icon={isPositive ? "lucide:trending-up" : "lucide:trending-down"} 
                    className="h-4 w-4" 
                  />
                }
              >
                {isPositive ? "+" : ""}{cryptoData.change24h.toFixed(2)}%
              </Chip>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 ml-auto">
          <Tooltip content="Visit Website">
            <Button
              isIconOnly
              variant="flat"
              as="a"
              href={cryptoData.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Website"
            >
              <Icon icon="lucide:globe" className="h-5 w-5" />
            </Button>
          </Tooltip>
          <Tooltip content="View Whitepaper">
            <Button
              isIconOnly
              variant="flat"
              as="a"
              href={cryptoData.whitepaper}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Whitepaper"
            >
              <Icon icon="lucide:file-text" className="h-5 w-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Block Explorer">
            <Button
              isIconOnly
              variant="flat"
              as="a"
              href={cryptoData.explorer}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Block Explorer"
            >
              <Icon icon="lucide:search" className="h-5 w-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Share">
            <Button
              isIconOnly
              variant="flat"
              aria-label="Share"
            >
              <Icon icon="lucide:share-2" className="h-5 w-5" />
            </Button>
          </Tooltip>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="space-y-4">
            <div>
              <p className="text-small text-default-500">Market Cap</p>
              <p className="font-semibold">{formatNumber(cryptoData.marketCap)}</p>
            </div>
            <Divider />
            <div>
              <p className="text-small text-default-500">24h Volume</p>
              <p className="font-semibold">{formatNumber(cryptoData.volume24h)}</p>
            </div>
            <Divider />
            <div>
              <p className="text-small text-default-500">Circulating Supply</p>
              <p className="font-semibold">{formatSupply(cryptoData.circulatingSupply)} {cryptoData.symbol}</p>
            </div>
            <Divider />
            <div>
              <p className="text-small text-default-500">Max Supply</p>
              <p className="font-semibold">
                {cryptoData.maxSupply ? `${formatSupply(cryptoData.maxSupply)} ${cryptoData.symbol}` : "Unlimited"}
              </p>
            </div>
            <Divider />
            <div>
              <p className="text-small text-default-500">All Time High</p>
              <p className="font-semibold">${cryptoData.allTimeHigh.toLocaleString()}</p>
            </div>
          </CardBody>
        </Card>
        
        <div className="md:col-span-3">
          <PriceChart
            title={`${cryptoData.name} (${cryptoData.symbol}) Price`}
            data={chartData}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>
      </div>

      <Card>
        <CardBody>
          <Tabs 
            aria-label="Crypto details" 
            selectedKey={activeTab} 
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tab
              key="overview"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:info" className="h-4 w-4" />
                  <span>Overview</span>
                </div>
              }
            >
              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">About {cryptoData.name}</h3>
                <p className="text-default-600">{cryptoData.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <h4 className="text-medium font-medium">Price Statistics</h4>
                    </CardHeader>
                    <CardBody className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-default-500">Price Change (24h)</span>
                        <span className={isPositive ? "text-success" : "text-danger"}>
                          {isPositive ? "+" : ""}{cryptoData.change24h.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">All Time High</span>
                        <span>${cryptoData.allTimeHigh.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Market Cap Rank</span>
                        <span>#{cryptoId === "btc" ? 1 : cryptoId === "eth" ? 2 : Math.floor(Math.random() * 20) + 3}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Market Cap Dominance</span>
                        <span>{cryptoId === "btc" ? "42.3" : cryptoId === "eth" ? "18.7" : (Math.random() * 5).toFixed(1)}%</span>
                      </div>
                    </CardBody>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <h4 className="text-medium font-medium">AI Prediction Accuracy</h4>
                    </CardHeader>
                    <CardBody className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-default-500">Short-term (1-7 days)</span>
                        <span className="text-success">{85 + Math.floor(Math.random() * 10)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Medium-term (1-3 months)</span>
                        <span className="text-primary">{75 + Math.floor(Math.random() * 10)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Long-term (6-12 months)</span>
                        <span className="text-warning">{65 + Math.floor(Math.random() * 10)}%</span>
                      </div>
                      <Button
                        color="primary"
                        startContent={<Icon icon="lucide:sparkles" className="h-4 w-4" />}
                        onPress={handlePrediction}
                        className="mt-2"
                        fullWidth
                      >
                        Generate Prediction
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
            
            <Tab
              key="markets"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:bar-chart-2" className="h-4 w-4" />
                  <span>Markets</span>
                </div>
              }
            >
              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">Top Markets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-default-200">
                        <th className="text-left py-3 px-4">#</th>
                        <th className="text-left py-3 px-4">Exchange</th>
                        <th className="text-left py-3 px-4">Pair</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Volume (24h)</th>
                        <th className="text-right py-3 px-4">Volume %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { exchange: "Binance", pair: `${cryptoData.symbol}/USDT`, price: cryptoData.price * (1 + (Math.random() - 0.5) * 0.01), volume: cryptoData.volume24h * 0.25, volumePercent: 25 },
                        { exchange: "Coinbase", pair: `${cryptoData.symbol}/USD`, price: cryptoData.price * (1 + (Math.random() - 0.5) * 0.01), volume: cryptoData.volume24h * 0.18, volumePercent: 18 },
                        { exchange: "Kraken", pair: `${cryptoData.symbol}/USD`, price: cryptoData.price * (1 + (Math.random() - 0.5) * 0.01), volume: cryptoData.volume24h * 0.12, volumePercent: 12 },
                        { exchange: "KuCoin", pair: `${cryptoData.symbol}/USDT`, price: cryptoData.price * (1 + (Math.random() - 0.5) * 0.01), volume: cryptoData.volume24h * 0.09, volumePercent: 9 },
                        { exchange: "Huobi", pair: `${cryptoData.symbol}/USDT`, price: cryptoData.price * (1 + (Math.random() - 0.5) * 0.01), volume: cryptoData.volume24h * 0.08, volumePercent: 8 },
                        { exchange: "Bitfinex", pair: `${cryptoData.symbol}/USD`, price: cryptoData.price * (1 + (Math.random() - 0.5) * 0.01), volume: cryptoData.volume24h * 0.07, volumePercent: 7 },
                        { exchange: "OKX", pair: `${cryptoData.symbol}/USDT`, price: cryptoData.price * (1 + (Math.random() - 0.5) * 0.01), volume: cryptoData.volume24h * 0.06, volumePercent: 6 },
                      ].map((market, index) => (
                        <tr key={index} className="border-b border-default-100 hover:bg-default-50">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{market.exchange}</td>
                          <td className="py-3 px-4">{market.pair}</td>
                          <td className="py-3 px-4 text-right">${market.price.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">{formatNumber(market.volume)}</td>
                          <td className="py-3 px-4 text-right">{market.volumePercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Tab>
            
            <Tab
              key="news"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:newspaper" className="h-4 w-4" />
                  <span>News</span>
                </div>
              }
            >
              <div className="py-4 space-y-4">
                {[
                  {
                    title: `${cryptoData.name} Reaches New Milestone in Network Adoption`,
                    source: "CryptoNews",
                    time: "2 hours ago",
                    image: `https://img.heroui.chat/image/ai?w=200&h=120&u=${Math.floor(Math.random() * 100)}`
                  },
                  {
                    title: `Major Exchange Announces New ${cryptoData.symbol} Trading Pairs`,
                    source: "CoinDesk",
                    time: "5 hours ago",
                    image: `https://img.heroui.chat/image/ai?w=200&h=120&u=${Math.floor(Math.random() * 100) + 100}`
                  },
                  {
                    title: `${cryptoData.name} Foundation Announces $10M Developer Grant Program`,
                    source: "The Block",
                    time: "8 hours ago",
                    image: `https://img.heroui.chat/image/ai?w=200&h=120&u=${Math.floor(Math.random() * 100) + 200}`
                  },
                  {
                    title: `Technical Analysis: ${cryptoData.symbol} Price Poised for Breakout`,
                    source: "CryptoBriefing",
                    time: "12 hours ago",
                    image: `https://img.heroui.chat/image/ai?w=200&h=120&u=${Math.floor(Math.random() * 100) + 300}`
                  },
                  {
                    title: `Institutional Investors Increase ${cryptoData.name} Holdings by 15%`,
                    source: "Bloomberg Crypto",
                    time: "1 day ago",
                    image: `https://img.heroui.chat/image/ai?w=200&h=120&u=${Math.floor(Math.random() * 100) + 400}`
                  }
                ].map((news, index) => (
                  <Card key={index} isPressable className="cursor-pointer">
                    <CardBody>
                      <div className="flex gap-4">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          className="w-24 h-24 object-cover rounded-medium"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{news.title}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-small text-default-500">{news.source}</span>
                            <span className="text-tiny text-default-400">•</span>
                            <span className="text-small text-default-500">{news.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </Tab>
            
            <Tab
              key="social"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:message-circle" className="h-4 w-4" />
                  <span>Social</span>
                </div>
              }
            >
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h4 className="text-medium font-medium">Twitter Sentiment</h4>
                        <Icon icon="logos:twitter" className="h-5 w-5" />
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-success"></div>
                          <span>Positive</span>
                        </div>
                        <span className="font-medium">{60 + Math.floor(Math.random() * 20)}%</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-default-400"></div>
                          <span>Neutral</span>
                        </div>
                        <span className="font-medium">{15 + Math.floor(Math.random() * 10)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-danger"></div>
                          <span>Negative</span>
                        </div>
                        <span className="font-medium">{5 + Math.floor(Math.random() * 15)}%</span>
                      </div>
                      
                      <div className="mt-6">
                        <h5 className="text-small font-medium mb-2">Top Tweets</h5>
                        <div className="space-y-3">
                          {[
                            {
                              user: "CryptoAnalyst",
                              text: `${cryptoData.name} looking bullish on the 4h chart. Key resistance at $${(cryptoData.price * 1.1).toFixed(2)}. #${cryptoData.symbol}`,
                              time: "2h ago"
                            },
                            {
                              user: "BlockchainDev",
                              text: `Just deployed a new dApp on ${cryptoData.name}. The ecosystem is growing rapidly! #${cryptoData.symbol} #DeFi`,
                              time: "5h ago"
                            },
                            {
                              user: "TradingGuru",
                              text: `${cryptoData.symbol} forming a cup and handle pattern. Target: $${(cryptoData.price * 1.25).toFixed(2)}. Not financial advice.`,
                              time: "8h ago"
                            }
                          ].map((tweet, index) => (
                            <div key={index} className="p-3 bg-default-50 rounded-medium">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">@{tweet.user}</span>
                                <span className="text-tiny text-default-400">•</span>
                                <span className="text-tiny text-default-400">{tweet.time}</span>
                              </div>
                              <p className="text-small mt-1">{tweet.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h4 className="text-medium font-medium">Reddit Activity</h4>
                        <Icon icon="logos:reddit-icon" className="h-5 w-5" />
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Active Users</span>
                            <span className="font-medium">{(Math.random() * 10000).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Posts (24h)</span>
                            <span className="font-medium">{(Math.random() * 500).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Comments (24h)</span>
                            <span className="font-medium">{(Math.random() * 2000).toFixed(0)}</span>
                          </div>
                        </div>
                        
                        <Divider />
                        
                        <div>
                          <h5 className="text-small font-medium mb-2">Top Posts</h5>
                          <div className="space-y-3">
                            {[
                              {
                                title: `Why ${cryptoData.name} will be a top performer in the next bull run`,
                                upvotes: Math.floor(Math.random() * 1000) + 500,
                                comments: Math.floor(Math.random() * 200) + 50,
                                time: "4h ago"
                              },
                              {
                                title: `Technical Analysis: ${cryptoData.symbol} approaching key support level`,
                                upvotes: Math.floor(Math.random() * 800) + 300,
                                comments: Math.floor(Math.random() * 150) + 30,
                                time: "7h ago"
                              },
                              {
                                title: `${cryptoData.name} vs competitors - A detailed comparison`,
                                upvotes: Math.floor(Math.random() * 600) + 200,
                                comments: Math.floor(Math.random() * 100) + 20,
                                time: "12h ago"
                              }
                            ].map((post, index) => (
                              <div key={index} className="p-3 bg-default-50 rounded-medium">
                                <p className="font-medium">{post.title}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center gap-1 text-tiny text-default-500">
                                    <Icon icon="lucide:arrow-up" className="h-3.5 w-3.5" />
                                    <span>{post.upvotes}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-tiny text-default-500">
                                    <Icon icon="lucide:message-square" className="h-3.5 w-3.5" />
                                    <span>{post.comments}</span>
                                  </div>
                                  <span className="text-tiny text-default-400">{post.time}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}