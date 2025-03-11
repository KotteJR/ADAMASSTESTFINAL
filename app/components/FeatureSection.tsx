import { useState } from "react";
import { Container, Title, Text, Modal, Image } from "@mantine/core";
import classes from "../styles/FeatureSection.module.scss";
import { useEffect, useRef } from "react";
import { animate, scroll } from "@motionone/dom";



interface Feature {
    title: string;
    description: string;
    details: string;
    image: string;
}

const features: Feature[] = [
    {
        title: "Due Diligence",
        description: "Rapid & accurate critical insights with AI-driven assessments.",
        details: "Our rigorous due diligence services go far beyond traditional methods, leveraging our proprietary AI-driven platform to provide unparalleled speed, depth, and accuracy in assessments. We meticulously analyze financial performance, operational efficiency, technological maturity, and potential risks associated with investment targets or strategic initiatives. This comprehensive approach uncovers hidden insights, validates growth assumptions, and flags potential pitfalls before they become critical issues. Unlike traditional due diligence, which can be resource-intensive and time-consuming, Adamass's AI-enhanced process drastically reduces evaluation timelines while simultaneously enhancing accuracy, ensuring our clients remain agile and informed in critical decision-making moments. By prioritizing clarity, precision, and thoroughness, our due diligence delivers actionable intelligence essential to successful investments and strategic partnerships.",
        image: "/aidd.png",
    },
    {
        title: "Capital Advisory.",
        description: "Secure the optimal capital structure to fuel your growth.",
        details: "Our capital advisory services are specifically designed to support startups and established businesses in securing optimal financing structures, fueling sustainable growth, and enhancing financial stability. We leverage extensive networks, market knowledge, and analytical rigor to match businesses with ideal investors, structuring financing deals that align precisely with strategic goals. Our approach includes detailed assessments of capital needs, evaluation of funding alternatives, and guidance throughout the investment negotiation process. Additionally, we advise on capital restructuring and refinancing solutions, enabling businesses to optimize their capital mix, reduce financial risks, and enhance long-term profitability. With Adamass’s capital advisory expertise, our clients are confidently positioned to secure investments that drive measurable growth, competitive advantage, and financial health.",
        image: "/aisa.png",
    },
    {
        title: "Strategic Advisory",
        description: "Position your business strategically to achieve sustainable growth.",
        details: "At Adamass, we understand that businesses today face unprecedented complexity, volatility, and disruption. Our strategic advisory services help clients define clear objectives, identify high-potential market opportunities, and execute winning strategies tailored to their unique strengths and competitive landscape. Through comprehensive market analysis, competitor benchmarking, and rigorous scenario planning, we help our clients anticipate market shifts and prepare effective strategic responses. Whether it involves growth acceleration, organizational transformation, product innovation, or optimizing operational efficiency, our seasoned experts partner closely with clients, ensuring strategies are not only insightful but practically executable. Our strategic advisory practice ultimately empowers businesses to pursue resilient, value-creating pathways that drive lasting success.",
        image: "/aica.png",
    },
];

export function FeatureSection() {
    const [opened, setOpened] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const sectionTitleRef = useRef<HTMLHeadingElement>(null);
    

  useEffect(() => {
      if (sectionTitleRef.current) {
        scroll(
          animate(sectionTitleRef.current,
            { 
              y: [-50, 0, 50], 
              opacity: [0.2, 1, 0.2] 
            },
            { easing: "ease-in-out", duration: 1.5 }
          ),
          { target: sectionTitleRef.current }
        );
      }
    }, []);

    const openModal = (feature: Feature) => {
        setSelectedFeature(feature);
        setOpened(true);
    };

    

    return (
        <Container className={classes.aboutSection} id="features">
          <Title ref={sectionTitleRef} order={2} className={classes.sectionTitle}>
         Our Expertise.
        </Title>

            <div className={classes.grid}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={classes.featureCard}
                        onClick={() => openModal(feature)}
                    >
                        <div
                            className={classes.image}
                            style={{ backgroundImage: `url(${feature.image})` }}
                        />
                        <div className={classes.content}>
                            <Title order={3} className={classes.featureTitle}>
                                {feature.title}
                            </Title>
                            <Text size="lg">{feature.description}</Text>
                        </div>

                        <div className={classes.plusIcon}>+</div>
                    </div>
                ))}
            </div>

            {selectedFeature && (
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size="lg"
                    centered
                    className={classes.modalCustomSize}
                >
                    <div className={classes.modalContent}>
                        <Title order={2} className={classes.modalTitle}>
                            {selectedFeature.title}
                        </Title>
                        <Text size="lg" className={classes.modalDescription}>
                            {selectedFeature.details}
                        </Text>
                        <div className={classes.modalImage}>
                            <Image src={selectedFeature.image} alt={selectedFeature.title} />
                        </div>
                    </div>
                </Modal>
            )}
        </Container>
    );
}
