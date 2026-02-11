import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import CustomModal, {RefModalObject} from './index';
import {Text} from 'react-native';

describe('CustomModal', () => {
  it('renders the modal content when opened', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByText, queryByText} = render(
      <CustomModal ref={modalRef}>
        <Text>Modal Content</Text>
      </CustomModal>,
    );

    expect(queryByText('Modal Content')).toBeNull();

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Modal Content'));
  });

  it('hides the modal content when closed', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByText, queryByText} = render(
      <CustomModal ref={modalRef}>
        <Text>Modal Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Modal Content'));

    await act(async () => {
      modalRef.current?.close();
    });

    await waitFor(() => expect(queryByText('Modal Content')).toBeNull(), {
      timeout: 1000,
    });
  });

  it('closes the modal when clicked outside', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByText, queryByText, getByTestId} = render(
      <CustomModal ref={modalRef}>
        <Text>Modal Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Modal Content'));

    const outsidePressable = getByTestId('outsidePressable');
    await act(async () => {
      fireEvent(outsidePressable, 'pressOut');
    });

    await waitFor(() => expect(queryByText('Modal Content')).toBeNull(), {
      timeout: 1000,
    });
  });

  it('does not close the modal when clicked outside with closeOutside set to false', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByText, getByTestId} = render(
      <CustomModal ref={modalRef} closeOutside={false}>
        <Text>Modal Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Modal Content'), {timeout: 2000});

    const outsidePressable = getByTestId('outsidePressable');
    fireEvent.press(outsidePressable);

    // Content should still be visible since closeOutside is false
    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('opens with slideDirection="down"', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByText, getByTestId} = render(
      <CustomModal ref={modalRef} slideDirection="down">
        <Text>Down Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Down Content'));
    expect(getByTestId('animatedView')).toBeTruthy();
  });

  it('opens with slideDirection="left"', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByText, getByTestId} = render(
      <CustomModal ref={modalRef} slideDirection="left">
        <Text>Left Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Left Content'));
    expect(getByTestId('animatedView')).toBeTruthy();
  });

  it('opens with slideDirection="right"', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByText, getByTestId} = render(
      <CustomModal ref={modalRef} slideDirection="right">
        <Text>Right Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Right Content'));
    expect(getByTestId('animatedView')).toBeTruthy();
  });

  it('fires onOpen callback after opening', async () => {
    const onOpenMock = jest.fn();
    const modalRef = React.createRef<RefModalObject>();
    render(
      <CustomModal ref={modalRef} onOpen={onOpenMock}>
        <Text>Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => expect(onOpenMock).toHaveBeenCalledTimes(1), {
      timeout: 1000,
    });
  });

  it('fires onClose callback after closing', async () => {
    const onCloseMock = jest.fn();
    const modalRef = React.createRef<RefModalObject>();
    const {getByText} = render(
      <CustomModal ref={modalRef} onClose={onCloseMock}>
        <Text>Content</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => getByText('Content'));

    await act(async () => {
      modalRef.current?.close();
    });

    await waitFor(() => expect(onCloseMock).toHaveBeenCalledTimes(1), {
      timeout: 1000,
    });
  });

  it('applies customContentStyle', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByTestId} = render(
      <CustomModal ref={modalRef} customContentStyle={{padding: 40}}>
        <Text>Styled</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => {
      const animatedView = getByTestId('animatedView');
      const styles = animatedView.props.style;
      const flatStyle = Array.isArray(styles)
        ? Object.assign({}, ...styles)
        : styles;
      expect(flatStyle.padding).toBe(40);
    });
  });

  it('applies custom backgroundColor', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByTestId} = render(
      <CustomModal ref={modalRef} backgroundColor="pink">
        <Text>Pink</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => {
      const animatedView = getByTestId('animatedView');
      const styles = animatedView.props.style;
      const flatStyle = Array.isArray(styles)
        ? Object.assign({}, ...styles)
        : styles;
      expect(flatStyle.backgroundColor).toBe('pink');
    });
  });

  it('passes through accessibilityLabel to animated view', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {getByTestId} = render(
      <CustomModal ref={modalRef} accessibilityLabel="Settings dialog">
        <Text>Settings</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    await waitFor(() => {
      const animatedView = getByTestId('animatedView');
      expect(animatedView.props.accessibilityLabel).toBe('Settings dialog');
    });
  });

  it('handles rapid open/close cycle without crashing', async () => {
    const modalRef = React.createRef<RefModalObject>();
    render(
      <CustomModal ref={modalRef}>
        <Text>Rapid</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
      modalRef.current?.close();
      modalRef.current?.open();
    });

    // Should not throw
    expect(modalRef.current).toBeTruthy();
  });

  it('stops animation on unmount', async () => {
    const modalRef = React.createRef<RefModalObject>();
    const {unmount} = render(
      <CustomModal ref={modalRef}>
        <Text>Unmount</Text>
      </CustomModal>,
    );

    await act(async () => {
      modalRef.current?.open();
    });

    expect(() => unmount()).not.toThrow();
  });
});
