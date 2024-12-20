import { browser } from '$app/environment';

export type Tu = 'トゥ' | 'ト゚' | 'ツ゚';
export type Mp = 'ンプ' | 'ㇺプ';

class OptionsManager {
	#punctuation: boolean = $state(true);
	#tu_as: Tu = $state('トゥ');
	#mp_as: Mp = $state('ンプ');

	constructor() {
		if (browser) {
			const saved = localStorage.getItem('options');
			if (saved) {
				const parsed = JSON.parse(saved);
				this.#punctuation = parsed.punctuation ?? this.#punctuation;
				this.#tu_as = parsed.tu_as ?? this.#tu_as;
				this.#mp_as = parsed.mp_as ?? this.#mp_as;
			}
		}
	}

	#saveToLocalStorage() {
		if (browser) {
			localStorage.setItem(
				'options',
				JSON.stringify({ punctuation: this.#punctuation, tu_as: this.#tu_as, mp_as: this.#mp_as })
			);
		}
	}

	get punctuation(): boolean {
		return this.#punctuation;
	}

	set punctuation(value: boolean) {
		this.#punctuation = value;
		this.#saveToLocalStorage();
	}

	get tu_as(): Tu {
		return this.#tu_as;
	}

	set tu_as(value: Tu) {
		this.#tu_as = value;
		this.#saveToLocalStorage();
	}

	get mp_as(): Mp {
		return this.#mp_as;
	}

	set mp_as(value: Mp) {
		this.#mp_as = value;
		this.#saveToLocalStorage();
	}
}

export const options = new OptionsManager();
