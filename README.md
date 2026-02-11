# rn-enhanced-core-components

Enhanced, reusable core components for React Native with TypeScript support.

## Installation

```bash
npm install rn-enhanced-core-components
```

### Peer Dependencies

```json
{
  "react": ">=18.0.0",
  "react-native": ">=0.71.0"
}
```

## Getting Started (Development)

```bash
npm install
cd ios && pod install && cd ..
```

## Scripts

```bash
npm run start          # Start Metro bundler
npm run ios            # Run on iOS
npm run android        # Run on Android
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run lint           # Run ESLint
npm run build          # Build library output to lib/
```

## Components

### CustomButton

A button with built-in loading, disabled states, and accessibility support.

```tsx
import {CustomButton} from 'rn-enhanced-core-components';

<CustomButton
  backgroundColor="red"
  style={{height: 50, borderRadius: 20}}
  onPress={() => console.log('pressed')}
  accessibilityLabel="Submit"
>
  <Text>Press Me</Text>
</CustomButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | -- | Content rendered inside the button |
| `onPress` | `() => void` | noop | Press handler |
| `disabled` | `boolean` | `false` | Disables the button and sets background to grey |
| `loading` | `boolean` | `false` | Shows an ActivityIndicator and disables interaction |
| `backgroundColor` | `ColorValue` | -- | Background color of the button |
| `style` | `StyleProp<ViewStyle>` | -- | Additional styles for the button container |
| `accessibilityLabel` | `string` | -- | Accessibility label describing the button |
| `accessibilityHint` | `string` | -- | Accessibility hint with additional context |
| `testID` | `string` | -- | Test identifier for e2e testing |

### CustomModal

An animated modal controlled via ref with configurable slide directions.

```tsx
import {CustomModal, RefModalObject} from 'rn-enhanced-core-components';

const modalRef = useRef<RefModalObject>(null);

<CustomButton onPress={() => modalRef.current?.open()}>
  <Text>Open</Text>
</CustomButton>

<CustomModal
  ref={modalRef}
  slideDirection="up"
  onOpen={() => console.log('opened')}
  onClose={() => console.log('closed')}
  accessibilityLabel="Settings dialog"
>
  <Text>Modal Content</Text>
  <CustomButton onPress={() => modalRef.current?.close()}>
    <Text>Close</Text>
  </CustomButton>
</CustomModal>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | -- | Content rendered inside the modal |
| `closeOutside` | `boolean` | `true` | Close the modal when pressing outside |
| `backgroundColor` | `ColorValue` | `'white'` | Background color of the modal content |
| `slideDirection` | `'up' \| 'down' \| 'left' \| 'right' \| 'top'` | `'up'` | Direction the modal slides in from |
| `customContentStyle` | `StyleProp<ViewStyle>` | -- | Custom styles for the modal content container |
| `onOpen` | `() => void` | -- | Callback fired after the open animation starts |
| `onClose` | `() => void` | -- | Callback fired after the close animation completes |
| `accessibilityLabel` | `string` | -- | Accessibility label for the modal content area |

**Ref methods (`RefModalObject`):**

- `open()` -- Opens the modal with a slide animation
- `close()` -- Closes the modal with a slide animation

## Accessibility

Both components include built-in accessibility support:

- **CustomButton** sets `accessibilityRole="button"` and reports `disabled`/`busy` state via `accessibilityState`
- **CustomModal** sets `accessibilityViewIsModal={true}` on the Modal and supports `accessibilityLabel` on the content area

## License

MIT
