import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Positioner } from '../../src';

const meta: Meta = {
  title: 'Positioner',
  component: Positioner,
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

const Template: Story = args => (
  <div className="p-20">
    {(() => {
      document.body.style.margin = '0';
      document.body.style.height = '100vh';
    })()}
    <div>See popover or tooltip story for now.</div>
  </div>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
