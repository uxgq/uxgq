import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Sidesheet, ISidesheetProps, Button } from '../../src';
import { useState } from '@storybook/addons';
import { useDisclosure } from '../../src/hooks';

const meta: Meta = {
  title: 'Sidesheet',
  component: Sidesheet,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ISidesheetProps> = ({ position }) => {
  const [isShown, setShown] = useState(false);

  return (
    <div className="p-20">
      {(() => {
        document.body.style.margin = '0';
        document.body.style.backgroundColor = '#eee';
        document.body.style.height = '100vh';
      })()}
      <Button onClick={() => setShown(prev => !prev)}>
        {isShown ? 'hide' : 'show'}
      </Button>
      <Sidesheet
        isOpen={isShown}
        position={position}
        onClose={() => setShown(false)}
      >
        <Nested />
      </Sidesheet>
    </div>
  );
};

const Nested = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <div>
      <Button onClick={onToggle}>Nested</Button>
      <Sidesheet isOpen={isOpen} onClose={onClose}></Sidesheet>
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
