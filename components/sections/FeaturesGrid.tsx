"use client";

import { motion } from "framer-motion";
import { FaRobot, FaHeart, FaUsers, FaLanguage } from "react-icons/fa";
import { Card, CardBody } from "@heroui/react";

const features = [
    {
        icon: FaRobot,
        title: "AI-Powered Recommendations",
        description: "Get personalized movie suggestions powered by advanced AI in English or Arabic",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: FaUsers,
        title: "Social Features",
        description: "Connect with movie lovers through posts, comments, likes, and reposts",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: FaHeart,
        title: "Personal Collections",
        description: "Save your favorites and create a watchlist for movies you want to see",
        gradient: "from-red-500 to-orange-500",
    },
    {
        icon: FaLanguage,
        title: "Multi-Language Support",
        description: "Enjoy seamless experience in both English and Arabic languages",
        gradient: "from-green-500 to-teal-500",
    },
];

const FeaturesGrid = () => {
    return (
        <section className="py-20 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Why Choose Movies Cafe?
                </h2>
                <p className="text-default-600 max-w-2xl mx-auto">
                    Experience the ultimate movie discovery platform with cutting-edge features
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <Card className="h-full backdrop-blur-md bg-default-50/50 border border-default-200 hover:border-default-300 transition-all">
                            <CardBody className="p-6">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                                    <feature.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-default-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesGrid;
