import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  useTheme,
} from '@mui/material';

const steps = ['Body Measurements', 'Fit Preference', 'Result'];

const bodyTypes = [
  'Hourglass',
  'Pear',
  'Rectangle',
  'Apple',
  'Athletic',
];

const fitPreferences = [
  'Tight',
  'Fitted',
  'Regular',
  'Loose',
  'Oversized',
];

const SizeRecommendation = ({ category, sizes, onSizeSelect }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hips: '',
  });
  const [bodyType, setBodyType] = useState('');
  const [fitPreference, setFitPreference] = useState('Regular');
  const [recommendedSize, setRecommendedSize] = useState(null);

  const handleMeasurementChange = (field, value) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateRecommendedSize = () => {
    // This is a simplified size recommendation logic
    // In a real application, this would be more sophisticated
    const { height, weight, bust, waist, hips } = measurements;
    
    // Convert measurements to numbers
    const bustSize = parseFloat(bust);
    const waistSize = parseFloat(waist);
    const hipsSize = parseFloat(hips);
    
    // Basic size mapping based on bust measurement
    let recommendedSize;
    if (bustSize < 32) recommendedSize = 'XS';
    else if (bustSize < 34) recommendedSize = 'S';
    else if (bustSize < 37) recommendedSize = 'M';
    else if (bustSize < 40) recommendedSize = 'L';
    else recommendedSize = 'XL';
    
    // Adjust based on fit preference
    const fitAdjustment = {
      'Tight': -1,
      'Fitted': -0.5,
      'Regular': 0,
      'Loose': 0.5,
      'Oversized': 1,
    };
    
    const sizeIndex = sizes.indexOf(recommendedSize);
    const adjustedIndex = Math.min(
      Math.max(0, sizeIndex + fitAdjustment[fitPreference]),
      sizes.length - 1
    );
    
    return sizes[Math.round(adjustedIndex)];
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return;
    }

    if (activeStep === 1) {
      const size = calculateRecommendedSize();
      setRecommendedSize(size);
      onSizeSelect(size);
    }

    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return Object.values(measurements).every(value => value !== '');
      case 1:
        return bodyType !== '' && fitPreference !== '';
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Height (cm)"
              type="number"
              value={measurements.height}
              onChange={(e) => handleMeasurementChange('height', e.target.value)}
              fullWidth
            />
            <TextField
              label="Weight (kg)"
              type="number"
              value={measurements.weight}
              onChange={(e) => handleMeasurementChange('weight', e.target.value)}
              fullWidth
            />
            <TextField
              label="Bust (inches)"
              type="number"
              value={measurements.bust}
              onChange={(e) => handleMeasurementChange('bust', e.target.value)}
              fullWidth
            />
            <TextField
              label="Waist (inches)"
              type="number"
              value={measurements.waist}
              onChange={(e) => handleMeasurementChange('waist', e.target.value)}
              fullWidth
            />
            <TextField
              label="Hips (inches)"
              type="number"
              value={measurements.hips}
              onChange={(e) => handleMeasurementChange('hips', e.target.value)}
              fullWidth
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Body Type</FormLabel>
              <RadioGroup
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                {bodyTypes.map(type => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Fit Preference</FormLabel>
              <RadioGroup
                value={fitPreference}
                onChange={(e) => setFitPreference(e.target.value)}
              >
                {fitPreferences.map(fit => (
                  <FormControlLabel
                    key={fit}
                    value={fit}
                    control={<Radio />}
                    label={fit}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Recommended Size: {recommendedSize}
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              Based on your measurements and preferences, we recommend size {recommendedSize} for the best fit.
              For a more relaxed fit, you might want to consider size {
                sizes[Math.min(sizes.indexOf(recommendedSize) + 1, sizes.length - 1)]
              }.
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Find Your Perfect Size
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent()}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, pt: 2, gap: 2 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            Next
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default SizeRecommendation;
