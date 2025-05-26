import React from "react";
import { Card, CardBody, CardHeader, Chip, Progress, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface PredictionResultCardProps {
  crypto: {
    name: string;
    symbol: string;
    icon: string;
  };
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  predictionDate: string;
  supportFactors: Array<{
    factor: string;
    impact: "positive" | "negative" | "neutral";
    description: string;
  }>;
}

export function PredictionResultCard({
  crypto,
  currentPrice,
  predictedPrice,
  confidence,
  timeframe,
  predictionDate,
  supportFactors,
}: PredictionResultCardProps) {
  const percentChange = ((predictedPrice - currentPrice) / currentPrice) * 100;
  const isPositive = percentChange > 0;

  const getConfidenceColor = () => {
    if (confidence >= 85) return "success";
    if (confidence >= 70) return "primary";
    if (confidence >= 50) return "warning";
    return "danger";
  };

  const getImpactIcon = (impact: "positive" | "negative" | "neutral") => {
    switch (impact) {
      case "positive":
        return <Icon icon="lucide:trending-up" className="h-4 w-4 text-success" />;
      case "negative":
        return <Icon icon="lucide:trending-down" className="h-4 w-4 text-danger" />;
      case "neutral":
        return <Icon icon="lucide:minus" className="h-4 w-4 text-default-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon={crypto.icon} className="h-6 w-6" />
            <h3 className="text-lg font-medium">{crypto.name} Prediction</h3>
          </div>
          <Chip color={getConfidenceColor()} variant="flat">
            {confidence}% Confidence
          </Chip>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-medium bg-content2 p-4">
            <div className="text-small text-default-500">
              {timeframe} Price Prediction (by {predictionDate})
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${predictedPrice.toLocaleString()}</span>
              <Chip
                color={isPositive ? "success" : "danger"}
                variant="flat"
                startContent={
                  <Icon 
                    icon={isPositive ? "lucide:trending-up" : "lucide:trending-down"} 
                    className="h-3 w-3" 
                  />
                }
                size="sm"
              >
                {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
              </Chip>
            </div>
            <div className="text-small text-default-500">
              Current: ${currentPrice.toLocaleString()}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-small font-medium">Prediction Confidence</span>
              <span className="text-small">{confidence}%</span>
            </div>
            <Progress
              aria-label="Prediction confidence"
              value={confidence}
              color={getConfidenceColor()}
              className="h-2"
            />
          </div>

          <Divider />

          <div className="space-y-3">
            <h4 className="text-medium font-medium">Supporting Factors</h4>
            {supportFactors.map((factor, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  {getImpactIcon(factor.impact)}
                  <span className="font-medium">{factor.factor}</span>
                </div>
                <p className="text-small text-default-500 pl-6">{factor.description}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}