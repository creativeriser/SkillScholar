document.addEventListener('DOMContentLoaded', function() {
    initializeCommonFormFeatures();
    
    const formId = document.querySelector('form')?.id;
    if (!formId) return;

    // Initialize specific form handlers
    const formHandlers = {
        kvpyApplicationForm: handleKVPYForm,
        ntseApplicationForm: handleNTSEForm,
        swamiVivekanandaForm: handleSwamiVivekanandaForm,
        hdfcApplicationForm: handleHDFCForm,
        stFellowshipForm: handleSTFellowshipForm,
        centralSectorForm: handleCentralSectorForm,
        dxcApplicationForm: handleDXCForm,
        anjumChopraForm: handleAnjumChopraForm,
        goSportsForm: handleGoSportsForm,
        turkiyeScholarshipForm: handleTurkiyeForm,
        twasCnpqForm: handleTWASCNPQForm,
        thinkBigForm: handleThinkBigForm,
        viceChancellorForm: handleViceChancellorForm,
        swarnaJayantiForm: handleSwarnaJayantiForm,
        disabledStudentsForm: handleDisabledStudentsForm,
        tataTrustsForm: handleTataTrustsForm,
        saiScholarshipForm: handleSAIForm
    };

    if (formHandlers[formId]) {
        formHandlers[formId]();
    }
});

function initializeCommonFormFeatures() {
    // Handle same as permanent address checkbox
    const sameAsPermanentCheckbox = document.getElementById('sameAsPermanent');
    if (sameAsPermanentCheckbox) {
        const correspondenceAddressTextarea = document.getElementById('correspondenceAddress');
        const permanentAddressTextarea = document.getElementById('permanentAddress');
        
        sameAsPermanentCheckbox.addEventListener('change', function() {
            if (this.checked) {
                correspondenceAddressTextarea.value = permanentAddressTextarea.value;
                correspondenceAddressTextarea.disabled = true;
            } else {
                correspondenceAddressTextarea.value = '';
                correspondenceAddressTextarea.disabled = false;
            }
        });

        permanentAddressTextarea?.addEventListener('input', function() {
            if (sameAsPermanentCheckbox.checked) {
                correspondenceAddressTextarea.value = this.value;
            }
        });
    }

    // Handle file uploads
    document.querySelectorAll('.file-upload input[type="file"]').forEach(fileInput => {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0]?.name;
            const fileNameDisplay = this.parentElement.querySelector('.file-name');
            if (fileNameDisplay) {
                fileNameDisplay.textContent = fileName || 'No file chosen';
            }
        });
    });

    // Handle conditional fields
    document.querySelectorAll('[data-toggle]').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const targetId = this.dataset.toggle;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const isVisible = this.value === 'yes';
                targetElement.style.display = isVisible ? 'block' : 'none';
                
                targetElement.querySelectorAll('input, select, textarea').forEach(field => {
                    field.required = isVisible;
                });
            }
        });
    });

    // Handle form submission
    document.querySelector('form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Show success message
            alert('Application submitted successfully! We will review your application and contact you soon.');
            
            // Reset form and conditional fields
            this.reset();
            document.querySelectorAll('[data-conditional]').forEach(el => {
                el.style.display = 'none';
            });
        }
    });
}

function validateForm(form) {
    let isValid = form.checkValidity();
    
    if (!isValid) {
        // Show validation messages
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach(field => {
            field.reportValidity();
        });
        return false;
    }
    
    return true;
}

// Individual form handlers
function handleKVPYForm() {
    const otherScholarshipsSelect = document.getElementById('otherScholarships');
    const scholarshipDetailsGroup = document.getElementById('scholarshipDetailsGroup');

    if (otherScholarshipsSelect && scholarshipDetailsGroup) {
        otherScholarshipsSelect.addEventListener('change', function() {
            scholarshipDetailsGroup.style.display = this.value === 'yes' ? 'block' : 'none';
            document.getElementById('scholarshipDetails').required = this.value === 'yes';
        });
    }
}

function handleNTSEForm() {
    const schoolTypeSelect = document.getElementById('schoolType');
    const odlDetailsGroup = document.getElementById('odlDetailsGroup');

    if (schoolTypeSelect && odlDetailsGroup) {
        schoolTypeSelect.addEventListener('change', function() {
            odlDetailsGroup.style.display = this.value === 'odl' ? 'block' : 'none';
            document.getElementById('odlDetails').required = this.value === 'odl';
        });
    }
}

// Add handlers for other forms...
function handleSwamiVivekanandaForm() {
    // Implementation for Swami Vivekananda form
}

function handleHDFCForm() {
    // Implementation for HDFC form
}

function handleSTFellowshipForm() {
    // Implementation for ST Fellowship form
}

function handleCentralSectorForm() {
    // Implementation for Central Sector form
}

function handleDXCForm() {
    // Implementation for DXC form
}

function handleAnjumChopraForm() {
    // Implementation for Anjum Chopra form
}

function handleGoSportsForm() {
    // Implementation for GoSports form
}

function handleTurkiyeForm() {
    // Implementation for Turkiye Scholarships form
}

function handleTWASCNPQForm() {
    // Implementation for TWAS-CNPq form
}

function handleThinkBigForm() {
    // Implementation for Think Big form
}

function handleViceChancellorForm() {
    // Implementation for Vice-Chancellor form
}

function handleSwarnaJayantiForm() {
    // Implementation for Swarna Jayanti form
}

function handleDisabledStudentsForm() {
    // Implementation for Disabled Students form
}

function handleTataTrustsForm() {
    // Implementation for Tata Trusts form
}

function handleSAIForm() {
    // Implementation for SAI form
}