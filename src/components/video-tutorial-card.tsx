import React from "react";
import { Card, CardBody, CardFooter, Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface VideoTutorialCardProps {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  videoId: string;
  author: string;
  onPlay: (videoId: string) => void;
}

export function VideoTutorialCard({
  title,
  description,
  thumbnail,
  duration,
  videoId,
  author,
  onPlay,
}: VideoTutorialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <div className="relative">
          <Image
            removeWrapper
            alt={title}
            className="z-0 w-full h-48 object-cover"
            src={thumbnail}
          />
          <div className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-tiny text-white">
            {duration}
          </div>
        </div>
        <CardBody className="flex-grow">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-small text-default-500 mt-1">{author}</p>
          <p className="text-small text-default-500 mt-2 line-clamp-3">{description}</p>
        </CardBody>
        <CardFooter>
          <Button 
            color="primary" 
            variant="flat" 
            startContent={<Icon icon="lucide:play" className="h-4 w-4" />}
            onPress={() => onPlay(videoId)}
            fullWidth
          >
            Watch Tutorial
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}