import { StoryObj, Meta } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ButtonsControl, MapButtonsIcons, MapButtonsTooltip } from '@app/components/commons/map/components/btn-controls/btn-controls.enums';
import { ButtonComponent } from './button.component';

export default {
  title: 'Components/Buttons',
  component: ButtonComponent,
  argTypes: {
    id: { control: 'text', description: 'Unique identifier for the button instance.' },
    name: { control: 'text', description: 'Text label to be displayed on the button.' },
    icon: { control: 'text', description: 'Icon type name from Ant Design Icons.' },
    disabled: { control: 'boolean', description: 'If true, the button will be disabled and non-clickable.' },
    type: { control: 'text', description: 'Defines the HTML button type, e.g., button, submit, reset.' },
    className: { control: 'text', description: 'CSS class applied to the button for styling purposes.' },
    isRound: { control: 'boolean', description: 'If true, makes the button circular.' },
    customClass: { control: 'text', description: 'Additional CSS class for custom styling.' },
    tooltipTitle: { control: 'text', description: 'Tooltip text displayed on hover.' },
    btnClick: { action: 'clicked', description: 'Emits click event when the button is clicked.' },
    btnClickId: { action: 'clicked with ID', description: 'Emits click event with ID when clicked.' },
  },
  args: { btnClick: action('btnClick'), btnClickId: action('btnClickId') },
} as Meta<ButtonComponent>;

const { BTN_HOME } = ButtonsControl;
const { HOME_TOOLTIP } = MapButtonsTooltip;
const { ICON_HOME, ICON_ZOOM_IN } = MapButtonsIcons;

const generateRandomId = (): number => Math.floor(Math.random() * 1000);

type ButtonStory = StoryObj<ButtonComponent>;

const createClickHandler =
  (actionFn: any, id: number) =>
  (button: HTMLButtonElement): void => {
    button.addEventListener('click', () => {
      actionFn(id);
    });
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  };

export const DefaultButton: ButtonStory = {
  args: {
    name: BTN_HOME,
    btnClick: action('MouseEvent for Default button'),
    type: 'button',
    className: 'default-button',
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) {
      button.addEventListener('click', (event: MouseEvent) => args.btnClick(event));
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  },
};

export const RoundButtonWithIcon: ButtonStory = {
  args: {
    isRound: true,
    icon: ICON_HOME,
    tooltipTitle: HOME_TOOLTIP,
    btnClickId: action('EventEmitter btnClickId for RoundButtonWithIcon: ID 1001'),
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    const fixedId = 1001;
    if (button) createClickHandler(args.btnClickId, fixedId)(button);
  },
};

export const DynamicIconButton: ButtonStory = {
  args: {
    isRound: true,
    icon: ICON_HOME,
    tooltipTitle: HOME_TOOLTIP,
    btnClickId: action('EventEmitter btnClickId for DynamicIconButton'),
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    let currentIcon = ICON_HOME;
    if (button) {
      button.addEventListener('click', () => {
        currentIcon = currentIcon === ICON_HOME ? ICON_ZOOM_IN : ICON_HOME;
        button.querySelector('i')!.setAttribute('nzType', currentIcon);
        args.btnClickId(currentIcon);
      });
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  },
};

export const SubmitButton: ButtonStory = {
  args: {
    name: 'Submit',
    type: 'submit',
    btnClick: action('Submit button clicked'),
    className: 'default-button',
  },
};

export const DefaultButtonWithId: ButtonStory = {
  args: {
    name: BTN_HOME,
    btnClickId: (id: number) => {
      const randomId = generateRandomId();
      action(`Default button clicked with ID: ${randomId}`)(id);
    },
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) createClickHandler(args.btnClickId, generateRandomId())(button);
  },
};

export const StatefulButton: ButtonStory = {
  args: {
    name: 'Load Data',
    btnClick: action('Stateful button clicked - start loading'),
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
        args.btnClick(new MouseEvent('click'));
      });
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  },
};

export const RoundButtonWithTooltipHover: ButtonStory = {
  args: {
    isRound: true,
    icon: ICON_HOME,
    tooltipTitle: HOME_TOOLTIP,
    btnClick: action('Round button with tooltip hover clicked'),
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    button?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); // Hover state test
  },
};

export const RandomIdButton: ButtonStory = {
  args: {
    name: 'Random ID',
    btnClickId: (id: number) => {
      const randomId = generateRandomId();
      action(`Button clicked with random ID: ${randomId}`)(id);
    },
  },
  play: async ({ args, canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) createClickHandler(args.btnClickId, generateRandomId())(button);
  },
};
