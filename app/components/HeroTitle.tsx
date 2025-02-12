import { Button, Container, Group, Text } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons'; // Assuming you've installed this
import classes from '../styles/HeroTitle.module.css';  // Updated import path

export function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Empowering{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            Businesses
          </Text>{' '}
          with Strategic Insights and Tailored Solutions
        </h1>

        <Text className={classes.description} color="dimmed">
        At Adamass AB, we offer expert consulting in financial strategies, due diligence, and IT solutions. Our customized approaches drive growth and help businesses succeed in a fast-paced market.        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get in Touch
          </Button>

          <Button
            size="xl"
              className={classes.control}
              variant="outline"  // Changes the button to have an outline
              style={{
                backgroundColor: 'transparent',  // Makes the background transparent
                borderColor: 'black',  // Adds black border
                color: 'black'  // Sets the text color to black
              }}
            >
              Read More!
            </Button>
        </Group>
      </Container>
    </div>
  );
}
