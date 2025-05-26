import React from "react";
import { Card, CardBody, CardHeader, Tabs, Tab, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { VideoTutorialCard } from "../components/video-tutorial-card";
import { FAQAccordion } from "../components/faq-accordion";
import { VideoModal } from "../components/video-modal";
import { motion } from "framer-motion";

export function Learn() {
  const [activeVideoId, setActiveVideoId] = React.useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = React.useState<string>("");
  const [selected, setSelected] = React.useState("tutorials");

  const handlePlayVideo = (videoId: string, title?: string) => {
    setActiveVideoId(videoId);
    setActiveVideoTitle(title || "Video Tutorial");
  };

  const handleCloseVideo = () => {
    setActiveVideoId(null);
  };

  // Mock data for tutorials
  const tutorials = [
    {
      title: "Introduction to Cryptocurrency Price Prediction",
      description: "Learn the basics of how AI models can predict cryptocurrency prices and what factors influence these predictions.",
      thumbnail: "https://img.heroui.chat/image/ai?w=800&h=450&u=1",
      duration: "12:34",
      videoId: "dQw4w9WgXcQ",
      author: "Alex Johnson"
    },
    {
      title: "Understanding LSTM Neural Networks",
      description: "Deep dive into Long Short-Term Memory neural networks and how they're used for time series prediction.",
      thumbnail: "https://img.heroui.chat/image/ai?w=800&h=450&u=2",
      duration: "18:21",
      videoId: "dQw4w9WgXcQ",
      author: "Dr. Maria Chen"
    },
    {
      title: "Technical Analysis for Crypto Trading",
      description: "Learn how to use technical indicators to analyze cryptocurrency markets and make informed trading decisions.",
      thumbnail: "https://img.heroui.chat/image/ai?w=800&h=450&u=3",
      duration: "24:15",
      videoId: "dQw4w9WgXcQ",
      author: "Michael Williams"
    },
    {
      title: "Sentiment Analysis in Crypto Markets",
      description: "Discover how social media sentiment and news affect cryptocurrency prices and how our AI incorporates this data.",
      thumbnail: "https://img.heroui.chat/image/ai?w=800&h=450&u=4",
      duration: "15:42",
      videoId: "dQw4w9WgXcQ",
      author: "Sarah Thompson"
    },
    {
      title: "Risk Management in Crypto Trading",
      description: "Essential strategies for managing risk when trading cryptocurrencies based on AI predictions.",
      thumbnail: "https://img.heroui.chat/image/ai?w=800&h=450&u=5",
      duration: "20:08",
      videoId: "dQw4w9WgXcQ",
      author: "Robert Davis"
    },
    {
      title: "Advanced Features of CryptoPredict AI",
      description: "Explore the advanced features and settings of our platform to get the most accurate predictions.",
      thumbnail: "https://img.heroui.chat/image/ai?w=800&h=450&u=6",
      duration: "16:37",
      videoId: "dQw4w9WgXcQ",
      author: "Emma Wilson"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How accurate are the AI predictions?",
      answer: "Our AI model achieves an average accuracy of 87-92% for short-term predictions (1-7 days) and 78-85% for medium-term predictions (1-3 months). Accuracy varies by cryptocurrency, market conditions, and prediction timeframe. We continuously refine our models to improve accuracy."
    },
    {
      question: "What data does the AI model use for predictions?",
      answer: "Our model analyzes multiple data sources including:<br/><br/>• Historical price data (OHLCV)<br/>• Trading volume patterns<br/>• Technical indicators (RSI, MACD, Moving Averages, etc.)<br/>• Social media sentiment analysis<br/>• News sentiment<br/>• On-chain metrics (active addresses, transaction counts)<br/>• Macro economic indicators<br/><br/>This comprehensive approach allows for more robust predictions than models using price data alone."
    },
    {
      question: "How often are the predictions updated?",
      answer: "Predictions are updated in real-time as new market data becomes available. The model continuously processes incoming data and adjusts predictions accordingly. You can generate new predictions at any time to reflect the latest market conditions."
    },
    {
      question: "Can I use these predictions for trading?",
      answer: "Yes, many users incorporate our predictions into their trading strategies. However, we strongly recommend:<br/><br/>• Using predictions as one of multiple factors in your decision-making<br/>• Implementing proper risk management<br/>• Starting with small position sizes until you're comfortable with the system<br/>• Understanding that no prediction system is 100% accurate<br/><br/>Remember that cryptocurrency markets are inherently volatile and all trading carries risk."
    },
    {
      question: "How is the confidence score calculated?",
      answer: "The confidence score represents the model's certainty in its prediction based on:<br/><br/>• Consistency of signals across different timeframes<br/>• Strength of identified patterns<br/>• Historical accuracy under similar market conditions<br/>• Agreement between different model components<br/>• Volatility of the target cryptocurrency<br/><br/>Higher confidence scores indicate stronger predictive signals and historically better accuracy."
    },
    {
      question: "What cryptocurrencies are supported?",
      answer: "We currently support price predictions for the top 20 cryptocurrencies by market capitalization, including Bitcoin, Ethereum, Cardano, Solana, Polkadot, and others. We regularly add support for additional cryptocurrencies based on user demand and data availability."
    },
    {
      question: "How is the model trained and validated?",
      answer: "Our LSTM neural network model is trained on historical data using an 80/20 train/validation split. We employ techniques like:<br/><br/>• K-fold cross-validation<br/>• Hyperparameter optimization<br/>• Regularization to prevent overfitting<br/>• Out-of-sample testing<br/>• Backtesting against historical market conditions<br/><br/>The model is continuously retrained as new data becomes available to maintain accuracy."
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-2">Learn</h1>
        <p className="text-default-500">
          Educational resources to help you understand cryptocurrency prediction and our AI model.
        </p>
      </motion.div>

      <Tabs 
        aria-label="Learning resources" 
        selectedKey={selected} 
        onSelectionChange={(key) => setSelected(key as string)}
      >
        <Tab
          key="tutorials"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:video" className="h-4 w-4" />
              <span>Video Tutorials</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {tutorials.map((tutorial, index) => (
              <VideoTutorialCard
                key={index}
                title={tutorial.title}
                description={tutorial.description}
                thumbnail={tutorial.thumbnail}
                duration={tutorial.duration}
                videoId={tutorial.videoId}
                author={tutorial.author}
                onPlay={() => handlePlayVideo(tutorial.videoId, tutorial.title)}
              />
            ))}
          </div>
        </Tab>
        
        <Tab
          key="faq"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:help-circle" className="h-4 w-4" />
              <span>FAQ</span>
            </div>
          }
        >
          <div className="mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
              </CardHeader>
              <CardBody>
                <FAQAccordion faqs={faqs} />
              </CardBody>
            </Card>
          </div>
        </Tab>
        
        <Tab
          key="glossary"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:book" className="h-4 w-4" />
              <span>Glossary</span>
            </div>
          }
        >
          <div className="mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Cryptocurrency & AI Terminology</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    {
                      term: "LSTM (Long Short-Term Memory)",
                      definition: "A type of recurrent neural network architecture designed to recognize patterns in sequences of data, such as time series. It's particularly effective for cryptocurrency price prediction because it can remember patterns over long periods."
                    },
                    {
                      term: "Technical Analysis",
                      definition: "A method of evaluating securities by analyzing statistics generated by market activity, such as past prices and volume. Technical analysts use charts and other tools to identify patterns that can suggest future activity."
                    },
                    {
                      term: "RSI (Relative Strength Index)",
                      definition: "A momentum oscillator that measures the speed and change of price movements on a scale from 0 to 100. Traditionally, an RSI reading above 70 indicates overbought conditions, while a reading below 30 indicates oversold conditions."
                    },
                    {
                      term: "MACD (Moving Average Convergence Divergence)",
                      definition: "A trend-following momentum indicator that shows the relationship between two moving averages of a security's price. The MACD is calculated by subtracting the 26-period exponential moving average from the 12-period EMA."
                    },
                    {
                      term: "Market Sentiment",
                      definition: "The overall attitude of investors toward a particular security or financial market. It's the feeling or tone of a market, or its crowd psychology, as revealed through the activity and price movement of the securities traded in that market."
                    },
                    {
                      term: "Overfitting",
                      definition: "A modeling error in machine learning where a model learns the detail and noise in the training data to the extent that it negatively impacts the performance of the model on new data."
                    },
                    {
                      term: "Feature Engineering",
                      definition: "The process of using domain knowledge to extract features from raw data that make machine learning algorithms work. For cryptocurrency prediction, this might include creating technical indicators or sentiment scores."
                    },
                    {
                      term: "Time Series Analysis",
                      definition: "A statistical technique that deals with time series data, or trend analysis. Time series data means that data is in a series of particular time periods or intervals."
                    },
                    {
                      term: "Backtesting",
                      definition: "The process of testing a trading strategy or predictive model on prior time periods. Instead of applying a strategy for the time period forward (which could take years), an analyst can backtest the strategy using historical data to generate results much more quickly."
                    },
                    {
                      term: "Confidence Score",
                      definition: "A metric that indicates how certain the AI model is about its prediction. Higher confidence scores generally correlate with more accurate predictions."
                    }
                  ].map((item, index) => (
                    <div key={index}>
                      <h4 className="font-semibold">{item.term}</h4>
                      <p className="text-default-600 mt-1">{item.definition}</p>
                      {index < 9 && <Divider className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
        
        <Tab
          key="resources"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:link" className="h-4 w-4" />
              <span>Resources</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Recommended Reading</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    {
                      title: "Advances in Financial Machine Learning",
                      author: "Marcos Lopez de Prado",
                      description: "Comprehensive guide to machine learning applications in finance, including time series prediction.",
                      link: "#"
                    },
                    {
                      title: "Deep Learning for Time Series Forecasting",
                      author: "Jason Brownlee",
                      description: "Practical guide to applying deep learning models to time series prediction problems.",
                      link: "#"
                    },
                    {
                      title: "Mastering Bitcoin",
                      author: "Andreas M. Antonopoulos",
                      description: "Essential reading for understanding the technical foundations of Bitcoin and blockchain.",
                      link: "#"
                    },
                    {
                      title: "Technical Analysis of the Financial Markets",
                      author: "John J. Murphy",
                      description: "Classic guide to technical analysis principles that apply to cryptocurrency markets.",
                      link: "#"
                    },
                    {
                      title: "The Age of Cryptocurrency",
                      author: "Paul Vigna & Michael J. Casey",
                      description: "Exploration of how cryptocurrencies are changing the global economic landscape.",
                      link: "#"
                    }
                  ].map((book, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Icon icon="lucide:book-open" className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-small text-default-500">by {book.author}</p>
                        <p className="text-small text-default-600 mt-1">{book.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">External Resources</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {[
                    {
                      title: "CoinMarketCap",
                      description: "Comprehensive cryptocurrency market data, rankings, charts, and more.",
                      icon: "lucide:bar-chart-2",
                      link: "#"
                    },
                    {
                      title: "TradingView",
                      description: "Advanced charting platform with technical analysis tools for cryptocurrency markets.",
                      icon: "lucide:line-chart",
                      link: "#"
                    },
                    {
                      title: "Glassnode",
                      description: "On-chain market intelligence platform with metrics and signals for crypto investors.",
                      icon: "lucide:activity",
                      link: "#"
                    },
                    {
                      title: "Crypto Fear & Greed Index",
                      description: "Daily sentiment analysis of the cryptocurrency market.",
                      icon: "lucide:gauge",
                      link: "#"
                    },
                    {
                      title: "Kaggle Cryptocurrency Datasets",
                      description: "Collection of datasets for cryptocurrency analysis and machine learning projects.",
                      icon: "lucide:database",
                      link: "#"
                    },
                    {
                      title: "CryptoCompare API",
                      description: "Comprehensive cryptocurrency data API for developers and researchers.",
                      icon: "lucide:code",
                      link: "#"
                    }
                  ].map((resource, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Icon icon={resource.icon} className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-small text-default-600 mt-1">{resource.description}</p>
                        <a href={resource.link} className="text-small text-primary mt-1 inline-block">
                          Visit website →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      <VideoModal
        isOpen={!!activeVideoId}
        onClose={handleCloseVideo}
        videoId={activeVideoId || ""}
        title={activeVideoTitle}
      />
    </div>
  );
}