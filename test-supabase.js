/**
 * Supabase Test Runner
 *
 * This script runs the Supabase test to verify the implementation
 */

// Node.js doesn't support ES modules by default, so we need to require this dynamically
async function importTestModule() {
  try {
    // For ES module support with import()
    const module = await import('./src/supabase/test.js');
    return module.default;
  } catch (error) {
    console.error('Error importing test module:', error);
    process.exit(1);
  }
}

// Run the test
console.log('🔍 Testing Supabase Implementation...');
console.log('======================================');

importTestModule()
  .then(testSupabase => testSupabase())
  .then(() => {
    console.log('======================================');
    console.log('✅ Test complete');
  })
  .catch(error => {
    console.error('======================================');
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  });
