import { RenderResult, fireEvent, render } from '@testing-library/react';
import CardAvatar from './CardAvatar';

const toggle = jest.fn();

describe('CardAvatar Component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <CardAvatar
        cardAuthor={'author'}
        cardAuthorAvatar={'image.jpeg'}
        onToggle={toggle}
      />
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  test('should render an avatar with image when cardAuthorAvatar is provided', () => {
    const avatar = component.getByTestId('cardAvatar');
    const image = avatar.querySelector('img');

    expect(avatar).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('should render an avatar with initials when cardAuthorAvatar is missing', () => {
    const { rerender } = component;

    rerender(
      <CardAvatar
        cardAuthor={'author'}
        cardAuthorAvatar={''}
        onToggle={jest.fn()}
    />);

    const avatar = component.getByTestId('cardAvatar');
    const { textContent } = avatar;

    expect(avatar).toBeInTheDocument();
    expect(textContent).toBe('Au');
  });

    test('should render an avatar with incognito icon when cardAuthor is "Incognito"', () => {
      const { rerender } = component;

      rerender(<CardAvatar cardAuthor="Incognito" cardAuthorAvatar="image.jpeg" onToggle={jest.fn()} />);

      const avatar = component.getByTestId('cardAvatar');
      const incognitoIcon = avatar.querySelector('.bi-incognito');

      expect(incognitoIcon).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
    });

    test('should trigger the onToggle function when clicked', () => {
      const avatar = component.getByTestId('cardAvatar');

      fireEvent.click(avatar);

      expect(toggle).toHaveBeenCalled();
    });
});
