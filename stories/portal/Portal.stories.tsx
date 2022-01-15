import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Portal } from '../../src';

const meta: Meta = {
  title: 'Portal',
  component: Portal,
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
  <div>
    <Portal>
      <div>Portal</div>
    </Portal>
    <Portal>
      <div>Second Portal</div>
    </Portal>
    <Portal>
      <div>Third Portal</div>
    </Portal>
  </div>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
