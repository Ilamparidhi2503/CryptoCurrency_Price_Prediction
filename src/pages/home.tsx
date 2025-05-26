import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { HomeNavbar } from "../components/home-navbar";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 hero-gradient" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="gradient-text">AI-Powered</span> Crypto Price Predictions
                </motion.h1>
                <motion.p 
                  className="text-xl text-default-700 mb-8 max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Leverage machine learning to predict cryptocurrency price trends with unparalleled accuracy. Make informed investment decisions backed by data science.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link to="/auth/register">
                    <Button 
                      color="primary" 
                      size="lg"
                      startContent={<Icon icon="lucide:rocket" className="h-5 w-5" />}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/app/learn">
                    <Button 
                      variant="bordered" 
                      size="lg"
                      startContent={<Icon icon="lucide:play" className="h-5 w-5" />}
                    >
                      Watch Demo
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <img 
                  src="https://img.heroui.chat/image/dashboard?w=800&h=600&u=1" 
                  alt="CryptoPredict AI Dashboard" 
                  className="w-full h-auto rounded-xl shadow-xl animate-float"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-content1">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-default-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge AI with comprehensive crypto data to deliver accurate predictions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "lucide:brain-circuit",
                  title: "Advanced ML Model",
                  description: "LSTM neural networks trained on years of historical crypto data for accurate predictions."
                },
                {
                  icon: "lucide:line-chart",
                  title: "Real-time Analysis",
                  description: "Live data integration with major exchanges for up-to-the-minute predictions."
                },
                {
                  icon: "lucide:bar-chart-2",
                  title: "Interactive Dashboard",
                  description: "Visualize predictions, historical performance, and model accuracy in one place."
                },
                {
                  icon: "lucide:book-open",
                  title: "Educational Resources",
                  description: "Learn about crypto markets and how our AI models make predictions."
                },
                {
                  icon: "lucide:bell",
                  title: "Price Alerts",
                  description: "Get notified when our AI detects significant price movement opportunities."
                },
                {
                  icon: "lucide:settings",
                  title: "Customizable Models",
                  description: "Adjust prediction parameters to match your investment strategy and risk tolerance."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full card-hover">
                    <CardBody className="flex flex-col items-center text-center p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Icon icon={feature.icon} className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-default-600">{feature.description}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-default-600 max-w-2xl mx-auto">
                Our AI-powered platform uses a sophisticated process to deliver accurate crypto predictions.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Data Collection",
                  description: "We gather historical price data, trading volumes, market sentiment, and on-chain metrics from multiple sources."
                },
                {
                  step: "2",
                  title: "Feature Engineering",
                  description: "Our algorithms transform raw data into meaningful features that capture market patterns and trends."
                },
                {
                  step: "3",
                  title: "Model Training",
                  description: "Advanced LSTM neural networks learn from historical patterns to identify predictive signals."
                },
                {
                  step: "4",
                  title: "Prediction Generation",
                  description: "The trained model analyzes current market conditions to forecast future price movements."
                },
                {
                  step: "5",
                  title: "Validation & Refinement",
                  description: "Predictions are continuously validated against actual outcomes to improve model accuracy."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex mb-12 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-8 flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                      {step.step}
                    </div>
                    {index < 4 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-primary/20" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-default-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Predict the Future?</h2>
              <p className="text-xl text-default-600 max-w-2xl mx-auto mb-8">
                Join thousands of traders using AI to make smarter investment decisions.
              </p>
              <Link to="/auth/register">
                <Button 
                  color="primary" 
                  size="lg"
                  startContent={<Icon icon="lucide:rocket" className="h-5 w-5" />}
                >
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-content2 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon icon="lucide:brain-circuit" className="text-primary text-2xl" />
                <span className="font-bold text-lg">CryptoPredict AI</span>
              </div>
              <p className="text-default-500 mb-4">
                Advanced AI-powered cryptocurrency price prediction platform.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-default-500 hover:text-primary">
                  <Icon icon="logos:twitter" className="h-5 w-5" />
                </a>
                <a href="#" className="text-default-500 hover:text-primary">
                  <Icon icon="logos:discord-icon" className="h-5 w-5" />
                </a>
                <a href="#" className="text-default-500 hover:text-primary">
                  <Icon icon="logos:github-icon" className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-default-500 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">API</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-default-500 hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Tutorials</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-default-500 hover:text-primary">About</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-default-500 hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <Divider className="my-8" />
          
          <div className="text-center text-default-500 text-sm">
            &copy; {new Date().getFullYear()} CryptoPredict AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}