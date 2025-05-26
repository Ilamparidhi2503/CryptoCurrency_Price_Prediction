import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter,
  Select,
  SelectItem,
  Button,
  Slider,
  Chip
} from "@heroui/react";
import { Icon } from "@iconify/react";

const cryptoOptions = [
  { label: "Bitcoin", value: "BTC", icon: "logos:bitcoin" },
  { label: "Ethereum", value: "ETH", icon: "logos:ethereum" },
  { label: "Cardano", value: "ADA", icon: "logos:cardano" },
  { label: "Solana", value: "SOL", icon: "logos:solana" },
  { label: "Polkadot", value: "DOT", icon: "logos:polkadot" },
];

const timeframeOptions = [
  { label: "1 Day", value: "1D" },
  { label: "1 Week", value: "1W" },
  { label: "1 Month", value: "1M" },
  { label: "3 Months", value: "3M" },
  { label: "6 Months", value: "6M" },
  { label: "1 Year", value: "1Y" },
];

interface PredictionFormProps {
  onSubmit: (data: {
    crypto: string;
    timeframe: string;
    confidenceThreshold: number;
    includeTechnicalIndicators: boolean;
    includeSentimentAnalysis: boolean;
  }) => void;
  isLoading?: boolean;
}

export function PredictionForm({ onSubmit, isLoading = false }: PredictionFormProps) {
  const [selectedCrypto, setSelectedCrypto] = React.useState<string>("BTC");
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<string>("1M");
  const [confidenceThreshold, setConfidenceThreshold] = React.useState<number>(75);
  const [includeTechnicalIndicators, setIncludeTechnicalIndicators] = React.useState<boolean>(true);
  const [includeSentimentAnalysis, setIncludeSentimentAnalysis] = React.useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      crypto: selectedCrypto,
      timeframe: selectedTimeframe,
      confidenceThreshold,
      includeTechnicalIndicators,
      includeSentimentAnalysis,
    });
  };

  const getConfidenceColor = () => {
    if (confidenceThreshold >= 85) return "success";
    if (confidenceThreshold >= 70) return "primary";
    if (confidenceThreshold >= 50) return "warning";
    return "danger";
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Generate Price Prediction</h3>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cryptocurrency Select */}
          <div>
            <Select
              label="Cryptocurrency"
              placeholder="Select a cryptocurrency"
              selectedKeys={[selectedCrypto]}
              onChange={(e) => setSelectedCrypto((e.target as HTMLSelectElement).value)}
              startContent={
                selectedCrypto && (
                  <Icon 
                    icon={cryptoOptions.find(c => c.value === selectedCrypto)?.icon || ""} 
                    className="h-5 w-5 mr-2" 
                  />
                )
              }
            >
              {cryptoOptions.map((crypto) => (
                <SelectItem 
                  key={crypto.value}
                  startContent={<Icon icon={crypto.icon} className="h-5 w-5" />}
                >
                  {crypto.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Timeframe Select */}
          <div>
            <Select
              label="Prediction Timeframe"
              placeholder="Select a timeframe"
              selectedKeys={[selectedTimeframe]}
              onChange={(e) => setSelectedTimeframe((e.target as HTMLSelectElement).value)}
            >
              {timeframeOptions.map((timeframe) => (
                <SelectItem key={timeframe.value}>
                  {timeframe.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Confidence Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-small">Confidence Threshold</label>
              <Chip color={getConfidenceColor()} variant="flat" size="sm">
                {confidenceThreshold}%
              </Chip>
            </div>
            <Slider
              step={5}
              minValue={50}
              maxValue={95}
              value={confidenceThreshold}
              onChange={(value) => setConfidenceThreshold(value as number)}
              color={getConfidenceColor()}
              className="max-w-full"
              aria-label="Confidence Threshold"
            />
            <p className="text-tiny text-default-500">
              Higher threshold requires stronger signals for prediction
            </p>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-small">Include Technical Indicators</span>
              <Button
                isIconOnly
                size="sm"
                variant={includeTechnicalIndicators ? "solid" : "bordered"}
                color={includeTechnicalIndicators ? "primary" : "default"}
                onPress={() => setIncludeTechnicalIndicators(!includeTechnicalIndicators)}
                aria-label="Toggle technical indicators"
              >
                <Icon icon={includeTechnicalIndicators ? "lucide:check" : "lucide:x"} className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-small">Include Sentiment Analysis</span>
              <Button
                isIconOnly
                size="sm"
                variant={includeSentimentAnalysis ? "solid" : "bordered"}
                color={includeSentimentAnalysis ? "primary" : "default"}
                onPress={() => setIncludeSentimentAnalysis(!includeSentimentAnalysis)}
                aria-label="Toggle sentiment analysis"
              >
                <Icon icon={includeSentimentAnalysis ? "lucide:check" : "lucide:x"} className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button 
              color="primary" 
              type="submit" 
              isLoading={isLoading}
              startContent={!isLoading && <Icon icon="lucide:sparkles" className="h-4 w-4" />}
              fullWidth
            >
              Generate Prediction
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
