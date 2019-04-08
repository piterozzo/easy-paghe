import React from 'react';
import classNames from 'classnames';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const styles = {
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
};

function ButtonWithLoader({ classes, isLoading, disabled, children, ...props }) {
	const buttonClassname = classNames({
		[classes.buttonSuccess]: isLoading,
		[props.className]: true,
	});

	return (
		<React.Fragment>
			<Button {...props} className={buttonClassname} disabled={isLoading || disabled}>
				{children}
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
			</Button>
		</React.Fragment>
	);
}

export default withStyles(styles)(ButtonWithLoader);
