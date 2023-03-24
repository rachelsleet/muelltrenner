import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Game from '../Game';

const handleSubmitDouble = (score: number) => {};

describe('Game can be played', () => {
  it('renders', async () => {
    render(<Game handleSubmit={handleSubmitDouble} />);

    expect(screen.getByText('Pick the right bin:'));
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(5);
  });

  it('displays Learn More link', async () => {
    render(<Game handleSubmit={handleSubmitDouble} />);

    const link = screen.getByText('Learn more');
    expect(link).toHaveAttribute(
      'href',
      'https://www.bsr.de/die-berliner-stadtreinigung-in-englischer-sprache-26142.php'
    );
  });

  it('increments the score', async () => {
    render(<Game handleSubmit={handleSubmitDouble} />);

    expect(screen.getByText('Score: 0/0'));
    const button = await screen.findByText('household');
    await userEvent.click(button);

    expect(screen.getByText(/Score\: ?0\/1/));
  });
});
