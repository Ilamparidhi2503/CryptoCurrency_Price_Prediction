import React from "react";
import { Card, CardBody, Chip, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CryptoPriceCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
  marketCap: number;
  volume24h: number;
  isSelected?: boolean;
  onSelect?: () => void;
  id?: string; // Add id prop for routing
  navigable?: boolean; // Whether the card should navigate to a detail page
}

export function CryptoPriceCard({
  name,
  symbol,
  price,
  change24h,
  icon,
  marketCap,
  volume24h,
  isSelected = false,
  onSelect,
  id,
  navigable = true
}: CryptoPriceCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const isPositive = change24h >= 0;

  const cardContent = (
    <CardBody className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Icon icon={icon} className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-small text-default-500">{symbol}</p>
          </div>
        </div>
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
          {isPositive ? "+" : ""}{change24h.toFixed(2)}%
        </Chip>
      </div>
      
      <div className="mt-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">${price.toLocaleString()}</h2>
          {navigable ? (
            <Link to={`/app/dashboard/${symbol.toLowerCase()}`}>
              <Tooltip content="View details">
                <span className="cursor-pointer text-default-500 hover:text-primary">
                  <Icon icon="lucide:external-link" className="h-5 w-5" />
                </span>
              </Tooltip>
            </Link>
          ) : (
            <Tooltip content="View details">
              <span className="cursor-pointer text-default-500 hover:text-primary">
                <Icon icon="lucide:external-link" className="h-5 w-5" />
              </span>
            </Tooltip>
          )}
        </div>
        <div className="mt-2 flex justify-between text-small text-default-500">
          <div>Market Cap: {formatNumber(marketCap)}</div>
          <div>Vol 24h: {formatNumber(volume24h)}</div>
        </div>
      </div>
    </CardBody>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {navigable ? (
        <Card 
          className={`card-hover cursor-pointer ${isSelected ? "border-2 border-primary" : ""}`}
          onClick={onSelect}
        >
          {cardContent}
        </Card>
      ) : (
        <Link to={`/app/dashboard/${symbol.toLowerCase()}`} className="block">
          <Card 
            className={`card-hover cursor-pointer ${isSelected ? "border-2 border-primary" : ""}`}
          >
            {cardContent}
          </Card>
        </Link>
      )}
    </motion.div>
  );
}