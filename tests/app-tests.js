/**
 * USACO Runner App Tests
 * 
 * This file contains basic tests for the USACO Runner application functionality
 */

// Test function to verify code editor initialization
function testCodeEditorInitialization() {
    console.log("Testing code editor initialization...");
    
    // Check if Monaco editor is loaded
    if (typeof monaco !== 'undefined') {
        console.log("✓ Monaco editor is loaded");
        return true;
    } else {
        console.log("✗ Monaco editor is not loaded");
        return false;
    }
}

// Test function to verify input/output panel structure
function testPanelStructure() {
    console.log("Testing panel structure...");
    
    // Check if main layout exists
    const mainLayout = document.querySelector('.main-layout');
    if (mainLayout) {
        console.log("✓ Main layout exists");
    } else {
        console.log("✗ Main layout missing");
        return false;
    }
    
    // Check if input section exists
    const inputSection = document.querySelector('.runtime-input-section');
    if (inputSection) {
        console.log("✓ Input section exists");
    } else {
        console.log("✗ Input section missing");
        return false;
    }
    
    // Check if output section exists
    const outputSection = document.querySelector('.output-section');
    if (outputSection) {
        console.log("✓ Output section exists");
    } else {
        console.log("✗ Output section missing");
        return false;
    }
    
    return true;
}

// Test function to verify layout dimensions
function testLayoutDimensions() {
    console.log("Testing layout dimensions...");
    
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');
    
    if (leftColumn && rightColumn) {
        // Get computed styles
        const leftStyle = window.getComputedStyle(leftColumn);
        const rightStyle = window.getComputedStyle(rightColumn);
        
        console.log("✓ Layout elements found");
        return true;
    } else {
        console.log("✗ Layout elements not found");
        return false;
    }
}

// Run all tests
function runAllTests() {
    console.log("=== Running USACO Runner Tests ===");
    
    let allPassed = true;
    
    try {
        if (!testCodeEditorInitialization()) allPassed = false;
        if (!testPanelStructure()) allPassed = false;
        if (!testLayoutDimensions()) allPassed = false;
        
        console.log("\n=== Test Results ===");
        if (allPassed) {
            console.log("✓ All tests passed!");
        } else {
            console.log("✗ Some tests failed");
        }
    } catch (error) {
        console.error("Error running tests:", error);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runAllTests,
        testCodeEditorInitialization,
        testPanelStructure,
        testLayoutDimensions
    };
}