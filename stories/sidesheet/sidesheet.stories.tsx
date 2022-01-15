import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Sidesheet, ISidesheetProps, Button, SidesheetHeader } from '../../src';
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

const Template: Story<ISidesheetProps> = ({ position, size }) => {
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
        size={size}
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

export const Profile = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <div>
      <Button onClick={onToggle}>Open Profile</Button>
      <Sidesheet size="lg" isOpen={isOpen} onClose={onClose}>
        <SidesheetHeader>Profile</SidesheetHeader>
        <div className="divide-y divide-gray-200">
          <div className="pb-6">
            <div className="bg-primary-700 h-24 sm:h-20 lg:h-28" />
            <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-15">
              <div>
                <div className="-m-1 flex">
                  <div className="inline-flex rounded-lg overflow-hidden border-4 border-white">
                    <img
                      className="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:w-48 lg:h-48"
                      src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:ml-6 sm:flex-1">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
                      Ashley Porter
                    </h3>
                    <span className="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                      <span className="sr-only">Online</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">@ashleyporter</p>
                </div>
                <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    className="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                  >
                    Message
                  </button>
                  <button
                    type="button"
                    className="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Call
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:px-0 sm:py-0">
            <dl className="space-y-8 sm:divide-y sm:divide-gray-200 sm:space-y-0">
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Bio
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                  <p>
                    Enim feugiat ut ipsum, neque ut. Tristique mi id elementum
                    praesent. Gravida in tempus feugiat netus enim aliquet a,
                    quam scelerisque. Dictumst in convallis nec in bibendum
                    aenean arcu.
                  </p>
                </dd>
              </div>
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                  New York, NY, USA
                </dd>
              </div>
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Website
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                  ashleyporter.com
                </dd>
              </div>
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Birthday
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                  <time dateTime="1982-06-23">June 23, 1982</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Sidesheet>
    </div>
  );
};
