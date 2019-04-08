import React from 'react';
import { Grid } from '@material-ui/core';
import ButtonWithLoader from './ButtonWithLoader';

function StepButtons({ activeStep, lastStepNumber, prev, next, save, isLoading }) {
	return (
		<React.Fragment>
			<Grid item>
				<ButtonWithLoader variant="contained" size="small" color="primary" onClick={prev} disabled={activeStep === 0 || activeStep === lastStepNumber}>
					Precedente
				</ButtonWithLoader>
			</Grid>
			{activeStep < lastStepNumber
				?
				<Grid item>
					<ButtonWithLoader variant="contained" size="small" color="primary" onClick={next} disabled={activeStep === lastStepNumber}>
						Prossimo
					</ButtonWithLoader>
				</Grid>
				: null}
			{activeStep === lastStepNumber
				?
				<Grid item>
					<ButtonWithLoader variant="contained" size="small" color="primary" onClick={save} isLoading={isLoading} disabled={activeStep !== lastStepNumber}>
						Salva
					</ButtonWithLoader>
				</Grid>
				: null}

		</React.Fragment>
	);
}

export default StepButtons;
