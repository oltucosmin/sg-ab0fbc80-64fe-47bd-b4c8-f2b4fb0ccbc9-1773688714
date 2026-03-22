import { supabase } from '@/lib/supabase';

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  gdprConsent: boolean;
}

export async function submitContactForm(submission: ContactSubmission) {
  try {
    const { error } = await (supabase
      .from('contact_submissions') as any)
      .insert([{
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        message: submission.message,
        gdpr_consent: submission.gdprConsent,
      }]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return { success: false, error };
  }
}