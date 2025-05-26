import React from "react";
import { Card, CardBody, CardHeader, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface LayerProps {
  name: string;
  nodes: number;
  type: string;
  activation?: string;
  description: string;
}

export function ModelArchitectureDiagram() {
  const layers: LayerProps[] = [
    {
      name: "Input Layer",
      nodes: 10,
      type: "input",
      description: "Time series data with technical indicators and market sentiment features"
    },
    {
      name: "LSTM Layer 1",
      nodes: 128,
      type: "lstm",
      activation: "tanh",
      description: "Long Short-Term Memory layer to capture temporal dependencies"
    },
    {
      name: "Dropout Layer",
      nodes: 128,
      type: "dropout",
      description: "Prevents overfitting with 20% dropout rate"
    },
    {
      name: "LSTM Layer 2",
      nodes: 64,
      type: "lstm",
      activation: "tanh",
      description: "Second LSTM layer for deeper feature extraction"
    },
    {
      name: "Dense Layer",
      nodes: 32,
      type: "dense",
      activation: "relu",
      description: "Fully connected layer for feature combination"
    },
    {
      name: "Output Layer",
      nodes: 1,
      type: "output",
      activation: "linear",
      description: "Predicted price value"
    }
  ];

  const getLayerIcon = (type: string) => {
    switch (type) {
      case "input":
        return "lucide:database";
      case "lstm":
        return "lucide:brain-circuit";
      case "dropout":
        return "lucide:filter";
      case "dense":
        return "lucide:network";
      case "output":
        return "lucide:bar-chart-2";
      default:
        return "lucide:layers";
    }
  };

  const getLayerColor = (type: string) => {
    switch (type) {
      case "input":
        return "bg-primary-100 text-primary-500 dark:bg-primary-900 dark:text-primary-300";
      case "lstm":
        return "bg-secondary-100 text-secondary-500 dark:bg-secondary-900 dark:text-secondary-300";
      case "dropout":
        return "bg-warning-100 text-warning-500 dark:bg-warning-900 dark:text-warning-300";
      case "dense":
        return "bg-success-100 text-success-500 dark:bg-success-900 dark:text-success-300";
      case "output":
        return "bg-danger-100 text-danger-500 dark:bg-danger-900 dark:text-danger-300";
      default:
        return "bg-default-100 text-default-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Model Architecture</h3>
      </CardHeader>
      <CardBody className="flex flex-col items-center">
        <div className="w-full max-w-md space-y-6 py-4">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <Tooltip content={layer.description}>
                <div className={`flex items-center justify-between rounded-medium p-3 ${getLayerColor(layer.type)}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90">
                      <Icon icon={getLayerIcon(layer.type)} className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{layer.name}</h4>
                      {layer.activation && (
                        <p className="text-tiny">Activation: {layer.activation}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-small">
                    {layer.nodes} {layer.nodes === 1 ? "node" : "nodes"}
                  </div>
                </div>
              </Tooltip>
              
              {index < layers.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 py-1">
                  <Icon icon="lucide:arrow-down" className="h-5 w-5 text-default-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}