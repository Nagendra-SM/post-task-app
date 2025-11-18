import React from "react";

export default function FeedbackModal({ visible, onClose, onSubmit }) {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        address: '',
        country: '',
        email: '',
        phoneNumber: '',
        feedback: ''
    });
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    function validate() {
        const newErrors = {};
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!formData.country.trim()) {
            newErrors.country = 'Country is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        }
        if (!formData.feedback.trim()) {
            newErrors.feedback = 'Feedback is required';
        }
        
        return Object.keys(newErrors).length === 0 ? {} : newErrors;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Store in localStorage
            const existingFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
            const newFeedback = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                ...formData
            };
            existingFeedback.push(newFeedback);
            localStorage.setItem('feedbackData', JSON.stringify(existingFeedback));
            
            // Call onSubmit prop
            onSubmit(formData);
            
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                country: '',
                email: '',
                phoneNumber: '',
                feedback: ''
            });
            setErrors({});
            onClose();
        } catch (error) {
            console.error('Error saving feedback:', error);
            setErrors({ submit: 'Failed to save feedback. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Feedback Form</h2>
                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name
                            <input 
                                type="text" 
                                name="firstName"
                                placeholder="First Name" 
                                value={formData.firstName} 
                                onChange={handleInputChange}
                                className={errors.firstName ? 'error' : ''}
                            />
                            {errors.firstName && <small className="error">{errors.firstName}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Last Name
                            <input 
                                type="text" 
                                name="lastName"
                                placeholder="Last Name" 
                                value={formData.lastName} 
                                onChange={handleInputChange}
                                className={errors.lastName ? 'error' : ''}
                            />
                            {errors.lastName && <small className="error">{errors.lastName}</small>}
                            </label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Address
                        <input 
                            type="text" 
                            name="address"
                            placeholder="Street Address" 
                            value={formData.address} 
                            onChange={handleInputChange}
                            className={errors.address ? 'error' : ''}
                        />
                        {errors.address && <small className="error">{errors.address}</small>}
                        </label>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Country
                            <input 
                                type="text" 
                                name="country"
                                placeholder="Country" 
                                value={formData.country} 
                                onChange={handleInputChange}
                                className={errors.country ? 'error' : ''}
                            />
                            {errors.country && <small className="error">{errors.country}</small>}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Email ID
                            <input 
                                type="email" 
                                name="email"
                                placeholder="email@example.com" 
                                value={formData.email} 
                                onChange={handleInputChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <small className="error">{errors.email}</small>}
                            </label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Phone Number
                        <input 
                            type="tel" 
                            name="phoneNumber"
                            placeholder="+1 234 567 8900" 
                            value={formData.phoneNumber} 
                            onChange={handleInputChange}
                            className={errors.phoneNumber ? 'error' : ''}
                        />
                        {errors.phoneNumber && <small className="error">{errors.phoneNumber}</small>}
                        </label>
                    </div>
                    
                    <div className="form-group">
                        <label>Feedback
                        <textarea 
                            name="feedback"
                            placeholder="Please share your feedback..." 
                            value={formData.feedback} 
                            onChange={handleInputChange}
                            className={errors.feedback ? 'error' : ''}
                            rows="4"
                        ></textarea>
                        {errors.feedback && <small className="error">{errors.feedback}</small>}
                        </label>
                    </div>
                    
                    {errors.submit && <div className="error-message">{errors.submit}</div>}
                    
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn btn-secondary" disabled={isSubmitting}>
                            Cancel
                        </button>
                        <button type="submit" className="btn primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
