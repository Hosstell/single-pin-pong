import hashlib
import time


def create_hash(val):
    return hashlib.md5(str(val).encode()).hexdigest()


def create_rocket_duel_game():
    a = time.time()
    b = a + 1
    c = b + 1

    left_player = create_hash(a)
    right_player = create_hash(b)
    game = create_hash(c)

    return {
        'game_id': game,
        'left_id': left_player,
        'right_id': right_player
    }


if __name__ == '__main__':
    data = create_rocket_duel_game()
    print(data)
