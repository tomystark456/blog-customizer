import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, FormEvent, useEffect } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);
	const asideRef = useRef<HTMLDivElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(initialState);
	}, [initialState]);

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		arrowRef: arrowRef,
		onClose: () => setIsOpen(false),
	});

	const handleSelectChange = (field: keyof ArticleStateType) => {
		return (value: ArticleStateType[keyof ArticleStateType]) => {
			setFormState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(initialState);
		onReset();
	};

	return (
		<>
			<ArrowButton
				ref={arrowRef}
				isOpen={isOpen}
				onClick={() => setIsOpen(!isOpen)}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.topContainer}>
						<Text size={31} weight={800} uppercase align='left' dynamicLite>
							Задайте параметры
						</Text>
					</div>
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleSelectChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleSelectChange('fontSizeOption')}
						name='fontSize'
					/>
					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleSelectChange('fontColor')}
					/>
					<Separator />

					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleSelectChange('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleSelectChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
