import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(mp3)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/sounds/', // Adjust as needed
                    outputPath: `${isServer ? '../' : ''}static/sounds/`, // Adjust as needed
                    name: '[name].[ext]',
                    esModule: false,
                },
            },
        });
        return config;
    },
    turbopack: {}
};

export default nextConfig;
