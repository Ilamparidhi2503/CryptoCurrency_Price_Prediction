import React from "react";
import { Card, CardBody, CardHeader, Progress, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ModelStatsCardProps {
  accuracy: number;
  loss: number;
  trainingTime: string;
  lastUpdated: string;
  epochs: number;
  modelType: string;
}

export function ModelStatsCard({
  accuracy,
  loss,
  trainingTime,
  lastUpdated,
  epochs,
  modelType,
}: ModelStatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h3 className="text-lg font-medium">Model Performance</h3>
        <Tooltip content="Refresh stats">
          <span className="cursor-pointer text-default-500 hover:text-primary">
            <Icon icon="lucide:refresh-cw" className="h-5 w-5" />
          </span>
        </Tooltip>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-small text-default-500">Accuracy</span>
            <span className="font-medium">{accuracy.toFixed(2)}%</span>
          </div>
          <Progress
            aria-label="Model accuracy"
            value={accuracy}
            color={accuracy > 75 ? "success" : accuracy > 60 ? "warning" : "danger"}
            className="h-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-small text-default-500">Loss</span>
            <span className="font-medium">{loss.toFixed(4)}</span>
          </div>
          <Progress
            aria-label="Model loss"
            value={100 - loss * 100}
            color={loss < 0.1 ? "success" : loss < 0.2 ? "warning" : "danger"}
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-small text-default-500">Model Type</p>
            <p className="font-medium">{modelType}</p>
          </div>
          <div>
            <p className="text-small text-default-500">Epochs</p>
            <p className="font-medium">{epochs}</p>
          </div>
          <div>
            <p className="text-small text-default-500">Training Time</p>
            <p className="font-medium">{trainingTime}</p>
          </div>
          <div>
            <p className="text-small text-default-500">Last Updated</p>
            <p className="font-medium">{lastUpdated}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}