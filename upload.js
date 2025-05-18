// Upload page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Handle file upload preview
    const fileInput = document.getElementById('fileUpload');
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    const challengeSelect = document.getElementById('challengeName');
    const otherChallengeGroup = document.getElementById('otherChallengeGroup');
    const otherChallengeInput = document.getElementById('otherChallenge');
    const uploadForm = document.getElementById('solutionUploadForm');

    // Show/hide "Other Challenge" input based on selection
    if (challengeSelect) {
        challengeSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherChallengeGroup.style.display = 'flex';
                otherChallengeInput.setAttribute('required', 'required');
            } else {
                otherChallengeGroup.style.display = 'none';
                otherChallengeInput.removeAttribute('required');
            }
        });
    }

    // Handle drag and drop functionality
    if (uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            uploadArea.classList.add('dragover');
        }

        function unhighlight() {
            uploadArea.classList.remove('dragover');
        }

        uploadArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }
    }

    // Handle file selection via input
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
    }

    function handleFiles(files) {
        if (!files.length) return;
        
        // Clear preview if more than 5 files are selected
        if (files.length > 5) {
            alert('Please select a maximum of 5 files.');
            fileInput.value = ''; // Clear the file input
            return;
        }

        // Clear existing previews
        uploadPreview.innerHTML = '';
        
        // Create preview for each file
        Array.from(files).forEach(file => {
            // Check file size
            const maxSize = getMaxSizeForFileType(file.type);
            if (file.size > maxSize) {
                alert(`File ${file.name} exceeds the maximum size limit.`);
                return;
            }

            const reader = new FileReader();
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            reader.onload = function(e) {
                let previewContent = '';
                
                // Check file type and create appropriate preview
                if (file.type.startsWith('image/')) {
                    previewContent = `<img src="${e.target.result}" alt="${file.name}">`;
                } else if (file.type.startsWith('video/')) {
                    previewContent = `<img src="video-thumbnail.svg" alt="Video file">`;
                } else if (file.type === 'application/pdf') {
                    previewContent = `<img src="pdf-thumbnail.svg" alt="PDF file">`;
                } else if (file.type.includes('document') || file.type.includes('presentation')) {
                    previewContent = `<img src="doc-thumbnail.svg" alt="Document file">`;
                } else {
                    previewContent = `<img src="file-thumbnail.svg" alt="File">`;
                }
                
                previewItem.innerHTML = `
                    ${previewContent}
                    <div class="file-name">${truncateFileName(file.name, 20)}</div>
                    <div class="remove-file" data-filename="${file.name}">×</div>
                `;
                
                // Add event listener to remove button
                const removeBtn = previewItem.querySelector('.remove-file');
                removeBtn.addEventListener('click', function() {
                    previewItem.remove();
                    // Note: We can't directly modify the FileList object, 
                    // so we'll need to handle this when the form is submitted
                });
            };
            
            reader.readAsDataURL(file);
            uploadPreview.appendChild(previewItem);
        });
    }

    function getMaxSizeForFileType(fileType) {
        if (fileType.startsWith('image/')) {
            return 5 * 1024 * 1024; // 5MB for images
        } else if (fileType.startsWith('video/')) {
            return 50 * 1024 * 1024; // 50MB for videos
        } else if (fileType === 'application/pdf') {
            return 10 * 1024 * 1024; // 10MB for PDFs
        } else if (fileType.includes('document')) {
            return 10 * 1024 * 1024; // 10MB for documents
        } else if (fileType.includes('presentation')) {
            return 20 * 1024 * 1024; // 20MB for presentations
        }
        return 5 * 1024 * 1024; // Default 5MB
    }

    function truncateFileName(name, maxLength) {
        if (name.length <= maxLength) return name;
        
        const extension = name.split('.').pop();
        const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
        
        if (nameWithoutExt.length <= maxLength - 3 - extension.length) {
            return name;
        }
        
        return nameWithoutExt.substring(0, maxLength - 3 - extension.length) + '...' + extension;
    }

    // Form submission
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would use FormData to send the form data to the server
            // For this demo, we'll just show a success message
            alert('Your solution has been submitted successfully! Thank you for sharing your work with the Kaaya community.');
            
            // Reset the form
            uploadForm.reset();
            uploadPreview.innerHTML = '';
        });
    }
});